# -*- coding: utf-8 -*-
"""
@axhub/make 0.6.21 前端功能删减补丁（测试副本验证通过版）

删除三类可见功能（只删入口与代码分支，不动共享 vendor 大 chunk）：
  1) 设置：更多菜单 Axhub官网 / GitHub链接 / 版本号；设置弹窗“项目更新”tab 与面板
  2) 页面工具：顶部“规格”按钮、“PRD 标注”按钮
  3) 发布：发布下拉 Axure 组、云服务组
保留：导出 HTML、复制截图、复制到 Figma、Git 版本和协作、批注、评审、设备预览、AI 设置、网络配置。

用法：
  干跑（只校验锚点与断言，不落盘）：
    python apply_make_patch.py --project "<项目根目录>"
  写盘（写盘前自动备份原始文件到 .patch-backup，已存在备份则不覆盖）：
    python apply_make_patch.py --project "<项目根目录>" --write
  也可用 --admin 直接指定 dist/admin 目录。
注意：锚点任一不唯一/缺失会直接 assert 中止，不会写盘；node_modules 被 pnpm/npm 重装或升级包后会被覆盖，需重跑本脚本。
"""
import os,sys,json,hashlib,shutil,argparse,datetime

ap=argparse.ArgumentParser()
ap.add_argument("--project",help="项目根目录（含 node_modules/@axhub/make）")
ap.add_argument("--admin",help="直接指定 dist/admin 目录（与 --project 二选一）")
ap.add_argument("--write",action="store_true",help="真正写盘；缺省为 dry-run")
ap.add_argument("--isolate",action="store_true",help="断链后写盘：只影响目标项目（默认）")
ap.add_argument("--share",action="store_true",help="原地写盘：与同 inode 的项目共享补丁")
args=ap.parse_args()

DEFAULT_PROJ=r"C:\Users\游翔\Documents\AI work\01 产品设计工作台\01-项目\测试"
if args.admin:
    ADMIN=args.admin
else:
    proj=args.project or DEFAULT_PROJ
    ADMIN=os.path.join(proj,"node_modules","@axhub","make","dist","admin")
if not os.path.isdir(ADMIN):
    sys.exit("admin 目录不存在: "+ADMIN)
BK=os.path.join(ADMIN,".patch-backup")

CFG=os.path.join(os.path.dirname(os.path.abspath(__file__)),"patch-config.json")
def load_mode():
    try:
        return json.load(open(CFG,encoding="utf-8")).get("mode","isolate")
    except Exception:
        return "isolate"
if args.isolate:
    MODE="isolate"
elif args.share:
    MODE="share"
else:
    MODE=load_mode()
print("补丁模式 MODE =",MODE, "(isolate=每项目独立 / share=共享同 inode 项目)")

def break_link(p):
    """断开硬链接：复制到临时文件→删原文件→放回，生成新 inode；已独立则跳过"""
    try:
        if os.stat(p).st_nlink<=1:
            return False
        tmp=p+".unlink-tmp"
        shutil.copy2(p,tmp)
        os.remove(p)
        os.replace(tmp,p)
        return True
    except Exception as e:
        print("  ! 断链失败:",p,e)
        return False

def read(rel): return open(os.path.join(ADMIN,rel.replace("/",os.sep)),encoding="utf-8").read()
def write(rel,t):
    p=os.path.join(ADMIN,rel.replace("/",os.sep))
    open(p,"w",encoding="utf-8",newline="").write(t)
def md5file(p):
    h=hashlib.md5()
    with open(p,"rb") as f:
        for b in iter(lambda:f.read(65536),b""): h.update(b)
    return h.hexdigest()

def match_paren(t,op):
    depth=0;i=op;instr=None
    while i<len(t):
        ch=t[i]
        if instr:
            if ch=="\\": i+=2;continue
            if ch==instr: instr=None
            i+=1;continue
        if ch in "\"'`": instr=ch;i+=1;continue
        if ch=="(":depth+=1
        elif ch==")":
            depth-=1
            if depth==0:return i
        i+=1
    raise RuntimeError("paren mismatch")

def call_span(t,marker,lead_comma=True):
    assert t.count(marker)==1, "marker count!=1: "+marker[:80]
    cs=t.find(marker);op=t.find("(",cs);e=match_paren(t,op)
    s=cs
    if lead_comma:
        j=cs-1
        while j>=0 and t[j] in " \n\r\t":j-=1
        if j>=0 and t[j]==",":s=j
    return s,e+1

report=[]
# ---------- index.js ----------
idx=read("assets/index.js"); orig_len=len(idx); dels=[]
if "Axhub 官网" in idx:
    # 1) 更多菜单末尾组：分隔A(深色模式后) + 官网 + GitHub + 分隔B + 版本号，整体删除；深色模式保留
    cs_ax=idx.find('r.jsxs(Vt,{className:"h-7 gap-2 text-sm",onClick:()=>window.open("https://axhub.im/')
    cs_gh=idx.find('r.jsxs(Vt,{className:"h-7 gap-2 text-sm",onClick:()=>window.open("https://github.com/lintendo/Axhub-Make"')
    cs_ver=idx.find('r.jsxs(Vt,{className:"h-7 gap-2 text-sm opacity-80 pointer-events-none"')
    assert 0<cs_ax<cs_gh<cs_ver, "菜单锚点顺序异常"
    iaA=idx.rfind("r.jsx(ia,{})",0,cs_ax)
    assert iaA>0 and iaA<cs_ax, "官网前分隔符缺失"
    s1=iaA
    j=s1-1
    while j>=0 and idx[j] in " \n\r\t": j-=1
    if j>=0 and idx[j]==",": s1=j
    _,e3=call_span(idx,'r.jsxs(Vt,{className:"h-7 gap-2 text-sm opacity-80 pointer-events-none"',False)
    assert e3>cs_ver
    dels.append(("更多菜单:分隔+官网+GitHub+分隔+版本号",s1,e3))
    # 2) 规格按钮（数组首元素，不带前导逗号）
    dels.append(("顶部:规格按钮",*call_span(idx,'r.jsx(En,{children:r.jsxs(In,{children:[r.jsx(jn,{asChild:!0,children:r.jsxs(Le,{variant:"ghost",size:"xs",className:pn,disabled:!xe||O,onClick:()=>{fe()}',False)))
    # 3) PRD标注按钮（带前导逗号）
    dels.append(("顶部:PRD标注按钮",*call_span(idx,'r.jsx(En,{children:r.jsxs(In,{children:[r.jsx(jn,{asChild:!0,children:r.jsxs(Le,{variant:G?"secondary":"ghost",size:"xs",className:qe(pn,G&&"bg-secondary text-secondary-foreground"),disabled:ge||Ye,onClick:dr',True)))
    # 4) Axure 组
    sm='r.jsx(ia,{}),r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"Axure"})'
    em='" 使用说明"]}):null'
    assert idx.count(sm)==1
    a=idx.find(sm); b=idx.find(em,a)+len(em)
    if a>0 and idx[a-1]==",": a-=1
    dels.append(("发布:Axure组",a,b))
    # 5) 云服务组
    sm2='r.jsx(ia,{}),r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"云服务"})'
    em2='" 更多平台与设置"]})'
    assert idx.count(sm2)==1
    c=idx.find(sm2); d=idx.find(em2,c)+len(em2)
    if c>0 and idx[c-1]==",": c-=1
    dels.append(("发布:云服务组",c,d))

    dels_sorted=sorted(dels,key=lambda x:x[1])
    for i in range(1,len(dels_sorted)):
        assert dels_sorted[i][1]>=dels_sorted[i-1][2], "overlap"

    new=idx
    for tag,s,e in sorted(dels,key=lambda x:-x[1]):
        report.append((tag,s,e,e-s,idx[s:e][:80]))
        new=new[:s]+new[e:]
    # 规范化：规格按钮为数组首元素，删除后去掉数组开头悬空逗号
    _dangling="children:[,r.jsx(En,"
    assert new.count(_dangling)==1, "dangling count=%d"%new.count(_dangling)
    new=new.replace(_dangling,"children:[r.jsx(En,",1)
else:
    new=idx
    print("index.js 已是补丁态（无'Axhub 官网'），跳过 index 删除")

must_gone=["Axhub 官网",'window.open("https://github.com/lintendo/Axhub-Make"'," 导出带交互原型"," 复制可编辑原型"," 使用说明"," 发布到 Axhub"," 发布到对象存储"," 发布到 Vercel"," 发布到 Cloudflare Pages"," 发布到 GitHub Pages"," 复制发布地址"," 更多平台与设置",'children:"云服务"','children:"Axure"']
must_keep=["导出 HTML","复制截图","复制到 Figma","版本和协作","项目设置","AI 设置"," 批注"," 评审","设备"]
gone_report={k:(k in new) for k in must_gone}
keep_report={k:(k in new) for k in must_keep}

# ---------- SettingsDialog.js ----------
setj=read("assets/chunks/SettingsDialog.js"); sdels=[]
if 'value:"update"' in setj:
    sdels.append(("设置:项目更新tab",*call_span(setj,'e.jsxs(Re,{value:"update"',True)))
    sdels.append(("设置:项目更新面板",*call_span(setj,'e.jsx(De,{value:"update"',True)))
    newset=setj
    for tag,s,e in sorted(sdels,key=lambda x:-x[1]):
        report.append(("Settings/"+tag,s,e,e-s,setj[s:e][:80]))
        newset=newset[:s]+newset[e:]
    assert newset.count("grid-cols-4")==1
    newset=newset.replace("grid-cols-4","grid-cols-3",1)
    _sr="项目设置 / 项目更新 / AI 设置 / 网络配置"
    assert newset.count(_sr)==1, "sr count=%d"%newset.count(_sr)
    newset=newset.replace(_sr,"项目设置 / AI 设置 / 网络配置",1)
else:
    newset=setj
    print("SettingsDialog.js 已是补丁态（无 value:update），跳过 settings 删除")

# ---------- SettingsDialog.js 第二批（2026-11-05）：删「项目设置」「网络配置」 ----------
if 'value:"project"' in newset:
    set2=[]
    s1,e1=call_span(newset,'e.jsx(Re,{value:"project"',False)
    if e1<len(newset) and newset[e1]==",": e1+=1
    set2.append(("设置:项目设置tab",s1,e1))
    set2.append(("设置:网络配置tab",*call_span(newset,'e.jsx(Re,{value:"network"',True)))
    set2.append(("设置:项目设置面板",*call_span(newset,'e.jsx(De,{value:"project"',True)))
    set2.append(("设置:网络配置面板",*call_span(newset,'e.jsx(De,{value:"network"',True)))
    for tag,s,e in sorted(set2,key=lambda x:-x[1]):
        report.append(("Settings2/"+tag,s,e,e-s,newset[s:e][:80]))
        newset=newset[:s]+newset[e:]
    _g="grid h-8 w-full max-w-[460px] grid-cols-3"
    assert newset.count(_g)==1, "tab 栅格锚点异常 count=%d"%newset.count(_g)
    newset=newset.replace(_g,"grid h-8 w-full max-w-[460px] grid-cols-1",1)
    _sr="项目设置 / AI 设置 / 网络配置"
    assert newset.count(_sr)==1, "sr 文本锚点异常 count=%d"%newset.count(_sr)
    newset=newset.replace(_sr,"AI 设置",1)
    print("已删：项目设置 / 网络配置（tab+面板），栅格 3→1")
else:
    print("SettingsDialog.js 已是第二批补丁态（无 value:project），跳过")
set_keep={k:(k in newset) for k in ["AI 设置"]}
set_gone={k:(k in newset) for k in ['value:"project"','value:"network"','children:"项目设置"','children:"网络配置"']}

# ---------- WorkspaceVersionCollaborationDrawer.js：删「管理技能」 ----------
DRW="assets/chunks/WorkspaceVersionCollaborationDrawer.js"
drw=read(DRW); drw2=[]
if 'e.jsx(re,{value:"skills"' in drw:
    drw2.append(("版本与协作:管理技能tab",*call_span(drw,'e.jsx(re,{value:"skills"',True)))
    mk='Ke?e.jsx(N,{title:"管理技能"'
    assert drw.count(mk)==1, "管理技能面板锚点异常"
    cs=drw.find(mk); op=drw.find("(",cs); e=match_paren(drw,op)
    assert drw[e+1:e+6]==":null", "面板尾随不是 :null，实际=%r"%drw[e+1:e+7]
    e=e+6
    if e<len(drw) and drw[e]==",": e+=1
    drw2.append(("版本与协作:管理技能面板",cs,e))
    for tag,s,e in sorted(drw2,key=lambda x:-x[1]):
        report.append(("Drawer/"+tag,s,e,e-s,drw[s:e][:80]))
        drw=drw[:s]+drw[e:]
    print("已删：版本与协作 / 管理技能（tab+面板）")
else:
    print("Drawer 已是补丁态（无管理技能 tab），跳过")
drw_keep={k:(k in drw) for k in ["在线仓库"]}
drw_gone={k:(k in drw) for k in ['title:"管理技能"','e.jsx(re,{value:"skills"']}

# ---------- 汇总断言 ----------
bad=[k for k,v in gone_report.items() if v]
lost=[k for k,v in keep_report.items() if not v]
lostset=[k for k,v in set_keep.items() if not v]
bads=[k for k,v in set_gone.items() if v]
bad_drw=[k for k,v in drw_gone.items() if v]
lost_drw=[k for k,v in drw_keep.items() if not v]
print("ADMIN =",ADMIN)
print("index new len=%d (orig %d, -%d)"%(len(new),orig_len,orig_len-len(new)))
print("--- must_gone (True=仍存在=异常) ---")
for k,v in gone_report.items(): print(("BAD " if v else "ok  ")+k)
print("--- must_keep index (False=丢失=异常) ---")
for k,v in keep_report.items(): print(("BAD " if not v else "ok  ")+k)
print("--- settings keep ---",set_keep)
print('settings 残留 value:"update" =',newset.count('value:"update"'),' value:"project" =',newset.count('value:"project"'),' value:"network" =',newset.count('value:"network"'))
print("--- settings 第二批 must_gone (True=异常) ---",set_gone)
print("--- drawer 管理技能 must_gone (True=异常) ---",drw_gone)
print("--- drawer keep (False=异常) ---",drw_keep)

if bad or lost or lostset or bads or bad_drw or lost_drw:
    print("\n*** 断言未通过，未写盘。bad=%s lost=%s lostset=%s bads=%s bad_drw=%s lost_drw=%s"%(bad,lost,lostset,bads,bad_drw,lost_drw))
    sys.exit(1)

if not args.write:
    print("\n(dry-run 校验通过；加 --write 写盘)")
    sys.exit(0)

# ---------- 写盘：先备份（缺失才建），再写 ----------
manifest_path=os.path.join(BK,"manifest.json")
manifest={}
if os.path.exists(manifest_path):
    manifest=json.load(open(manifest_path,encoding="utf-8"))
for rel in ["assets/index.js","assets/chunks/SettingsDialog.js","assets/chunks/WorkspaceVersionCollaborationDrawer.js"]:
    bp=os.path.join(BK,rel.replace("/",os.sep))
    if MODE=="isolate":
        tp=os.path.join(ADMIN,rel.replace("/",os.sep))
        if break_link(tp):
            print("断链（隔离）:",rel)
    if not os.path.exists(bp):
        os.makedirs(os.path.dirname(bp),exist_ok=True)
        src=os.path.join(ADMIN,rel.replace("/",os.sep))
        shutil.copy2(src,bp)
        manifest[rel]={"md5":md5file(bp),"bytes":os.path.getsize(bp),"backedUpAt":datetime.datetime.now().isoformat(timespec="seconds")}
        print("备份新建:",rel)
    else:
        print("备份已存在(不覆盖):",rel)
json.dump(manifest,open(manifest_path,"w",encoding="utf-8"),ensure_ascii=False,indent=1)
write("assets/index.js",new)
write("assets/chunks/SettingsDialog.js",newset)
write("assets/chunks/WorkspaceVersionCollaborationDrawer.js",drw)
print("\n*** WRITTEN *** 请重启 make 服务或浏览器强刷后查看。")
