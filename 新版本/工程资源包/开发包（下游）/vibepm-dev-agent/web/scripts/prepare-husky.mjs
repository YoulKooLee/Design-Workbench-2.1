import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'

if (existsSync('.git') || existsSync('../.git') || existsSync('../../.git')) {
  try {
    execSync('husky', { stdio: 'inherit' })
  } catch {
    console.log('husky: skip (husky not ready)')
  }
} else {
  console.log('husky: skip install (not a git repository)')
}
