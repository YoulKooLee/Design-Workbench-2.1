import React from "react"

import { useState } from "react"
import Link from "../compat/link"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Eye, EyeOff, Lock, CheckCircle, ArrowLeft } from "lucide-react"
import { AuthBrandSection } from "./auth-brand-section"

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ["非常弱", "较弱", "一般", "良好", "强"]
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("两次输入的密码不一致")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen flex">
      <AuthBrandSection />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {!isSuccess ? (
            <div className="space-y-6">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">CMS Full Form</h1>
              </div>

              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">重置密码</h2>
                <p className="text-slate-600">在下方输入新密码，完成重置流程。</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">新密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入新密码"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 w-full rounded-full ${
                              level <= passwordStrength ? strengthColors[passwordStrength - 1] : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600">
                        密码强度：{strengthLabels[passwordStrength - 1] || "非常弱"}
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入新密码"
                      className="pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600">两次输入的密码不一致</p>
                  )}
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-2">密码要求：</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-slate-300"}`}
                      />
                      <span>至少 8 个字符</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${/[A-Z]/.test(formData.password) ? "bg-green-500" : "bg-slate-300"}`}
                      />
                      <span>包含一个大写字母</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${/[a-z]/.test(formData.password) ? "bg-green-500" : "bg-slate-300"}`}
                      />
                      <span>包含一个小写字母</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${/[0-9]/.test(formData.password) ? "bg-green-500" : "bg-slate-300"}`}
                      />
                      <span>包含一个数字</span>
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || formData.password !== formData.confirmPassword || passwordStrength < 3}
                >
                  {isLoading ? "正在重置密码..." : "重置密码"}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回登录
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">CMS Full Form</h1>
              </div>

              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">密码重置成功</h2>
                <p className="text-slate-600 mb-6">
                  你的密码已成功重置，现在可以使用新密码登录。
                </p>
              </div>

              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/auth/login">登录你的账户</Link>
                </Button>

                <p className="text-sm text-slate-500">
                  出于安全考虑，你需要在所有设备上重新登录。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
