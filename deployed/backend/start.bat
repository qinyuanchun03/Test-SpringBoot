@echo off
setlocal
echo ==========================================
echo   Spring Boot Blog Backend Starter
echo ==========================================

:: Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java not found. Please install JDK 17 or higher.
    pause
    exit /b 1
)

:: Check Maven
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Maven (mvn) not found in PATH.
    echo ------------------------------------------
    echo Please install Maven or use 'winget install Apache.Maven'
    echo After installation, RESTART this terminal.
    echo ------------------------------------------
    pause
    exit /b 1
)

echo [INFO] Starting Spring Boot application...
mvn spring-boot:run

pause
