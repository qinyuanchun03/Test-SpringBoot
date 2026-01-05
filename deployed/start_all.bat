@echo off
echo ==================================================
echo   Blog System - 一键启动脚本 (Master Starter)
echo ==================================================

echo [1/2] 正在启动后端服务 (Backend)...
start cmd /k "cd backend && start.bat"

echo [2/2] 正在启动前端服务 (Frontend)...
start cmd /k "cd frontend && npm install && npm run dev"

echo --------------------------------------------------
echo 后端服务默认地址: http://localhost:8080/api
echo 前端服务默认地址: http://localhost:5173
echo --------------------------------------------------
echo 请确保你已经修改了 config.properties 中的数据库信息。
pause
