# reactCore3A
IDE: Visual Studio 2019   
Backend: ASP.NET Core 3.1   
Frontend: react.v16.13   
React-Hooks   

# 特性
* Hot loading   
* Debugging JavaScript in the IDE   
* 與Visual Stuido IDE整合

# DB Access: EF Core 3
* 支援CLI指令建立同步資料庫的ORM-schema，但尚無視覺化工具支援。   
* 已可試用在小專案。   
* 不過個人認為成熟度仍不足。現階段仍不建議使用EF Core。   

# 認證方法支援：
* cookie-base Auth. (建議)   
* Jwt Bearer token   

# 可選擇性支援Session與cookie。
前後端藕斷絲連   

# Coding的部份
#### 後端
* ASP.NET Core3 WebApi
#### 前端
* Hot loading
* Debugging JavaScript in the IDE
* 使用標準的[react-scripts 3.4.1]   
 React 16.13+   
 React-Hooks
* 環境參數模組"env-cmd"   
```javascript
// 指定import path時可用絕對路徑，
import YourComponent from 'Hooks/userFormData'

// 不用辛苦的輸入相對路徑"../../"。
import YourComponent from '../../Hooks/userFormData'
```

# 部署
* 與IDE傳統部署程序一樣。
* SSL設定同樣可在IIS再加入。
