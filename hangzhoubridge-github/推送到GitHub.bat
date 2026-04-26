@echo off
chcp 65001 >nul
color 0B

cls
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                                                              ║
echo ║           推送代码到GitHub仓库                                ║
echo ║           (使用新的干净文件夹)                                ║
echo ║                                                              ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo [当前项目] hangzhoubridge-github
echo.
echo [1] 在GitHub创建仓库
echo     访问: https://github.com
echo     创建名为: hangzhoubridge-github 的公开仓库
echo.
echo [2] 输入您的GitHub信息
echo.

set /p GITHUB_USERNAME="请输入您的GitHub用户名: "

set "GITHUB_REPO=https://github.com/%GITHUB_USERNAME%/hangzhoubridge-github.git"

echo.
echo [确认] 仓库地址: %GITHUB_REPO%
echo.

set /p CONFIRM="确认推送到此仓库? (Y/N): "
if /i not "%CONFIRM%"=="Y" (
    echo.
    echo [取消] 请重新运行脚本
    pause
    exit /b 1
)

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo [系统] 正在推送代码到GitHub...
echo.

cd C:\Users\30782\Desktop\hangzhoubridge-github

git remote add origin %GITHUB_REPO% 2>nul
git remote set-url origin %GITHUB_REPO%
git branch -M main

echo.
echo ┌─────────────────────────────────────────────────────────────┐
echo │  提示: 如果需要输入密码，请使用Personal Access Token        │
echo │  不是GitHub密码！                                           │
echo │                                                           │
echo │  获取Token:                                                │
echo │  GitHub → Settings → Developer settings                    │
echo │  → Personal access tokens → Tokens (classic)               │
echo │  → Generate new token (classic)                           │
echo │  → 勾选 repo 权限                                          │
echo └─────────────────────────────────────────────────────────────┘
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ╔══════════════════════════════════════════════════════════════╗
    echo ║                                                          ║
    echo ║             推送成功！                                   ║
    echo ║                                                          ║
    echo ║  访问您的仓库:                                           ║
    echo ║  https://github.com/%GITHUB_USERNAME%/hangzhoubridge-github ║
    echo ║                                                          ║
    echo ╚══════════════════════════════════════════════════════════════╝
    echo.
    echo [下一步]
    echo     1. 访问Vercel: https://vercel.com
    echo     2. 导入此仓库
    echo     3. 部署成功后获得在线网址
    echo.
) else (
    echo.
    echo ╔══════════════════════════════════════════════════════════════╗
    echo ║                                                          ║
    echo ║             推送失败                                     ║
    echo ║                                                          ║
    echo ║  可能的原因:                                             ║
    echo ║  1. GitHub用户名输入错误                                  ║
    echo ║  2. 仓库尚未在GitHub创建                                  ║
    echo ║  3. 网络连接问题                                          ║
    echo ║  4. Token权限不足或已失效                                 ║
    echo ║                                                          ║
    echo ║  请检查后重新运行脚本                                     ║
    echo ║                                                          ║
    echo ╚══════════════════════════════════════════════════════════════╝
    echo.
)

pause
