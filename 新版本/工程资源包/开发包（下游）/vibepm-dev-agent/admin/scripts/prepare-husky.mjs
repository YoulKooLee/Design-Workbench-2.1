import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

if (existsSync('.git')) {
  execSync('husky install', { stdio: 'inherit' })
} else {
  console.log('husky: skip install (not a git repository)')
}
