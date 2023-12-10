/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/splashscreen/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Creates a splash screen before the title screen
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.2.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * Description: Creates a splash screen before the title screen. It can handle
 * multiple splashes, and splashes can be skipped with input.
 * ----------------------------------------------------------------------------
 * Documentation:
 * Fade speed is how much is added/subtracted from opacity each frame during
 * fade.
 * 
 * Images that do not fill the screen completely will be centered.
 *
 * For the sound delay and display time parameters, 60f = 1 second
 *
 * When setting Stop BGM After Splash to false, BGM will continue to play
 * until either splash scene end or another splash is encountered with a
 * different BGM.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not support plugin commands.
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_SplashScreen.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 * 1.0 - Initial release
 *
 * 1.1.0:
 * - Added ability to play a sound effect for each splash
 * - Added sound delay property sound effect
 * - Optimized plugin code
 *
 * 1.2.0:
 * - Added option to play a BGM for each splash
 *
 * @param Display Time
 * @type number
 * @min 1
 * @desc Determines amount of time (in frames) splash is shown for.
 * @default 360
 * 
 * @param Fade Speed
 * @type number
 * @min 1
 * @max 255
 * @desc Determines how fast each splash fades
 * @default 2
 * 
 * @param Stop BGM After Splash
 * @type boolean
 * @desc If set to false, BGM will not stop after splash
 * @default true
 *
 * @param Splashes
 * @type struct<Splash>[]
 * @default []
 * @desc Set up splash image/sound properties
*/
/*~struct~Splash:
 * @param Image
 * @type file
 * @dir img/
 * @default
 * @desc The image to show on the splash screen
 * 
 * @param Sound Effect
 * @type file
 * @dir audio/se
 * @desc Sound to play when the splash is shown
 * 
 * @param BGM
 * @type file
 * @dir audio/bgm
 * @desc Sound to play when the splash is shown
 *
 * @param Sound Delay
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of time (in frames) to wait before playing the sound effect
*/
/*:zh-CN
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/splashscreen/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc OP播放系统（在标题画面之前播放图片、音效或音乐）
 * @help
 * ============================================================================
 * 【使用条款】
 * 1、本插件可作商用或非商用。
 * 2、须注明插件作者"Casper Gaming"。
 * 3、须提供该插件的作者网站链接。
 * 4、最终使用条款以作者官网公告为准。https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * 【赞助支持】
 * 您可以登陆以下网站并对作者进行支持和赞助。
 * 然后获得作者和其插件的最新资讯，以及测试版插件的试用。
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * 【插件版本】 V 1.2.0
 * ----------------------------------------------------------------------------
 * 【兼容性】仅测试作者所制作的插件
 * 【RM版本】RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * 【插件描述】在进入标题画面前播放图片、音效或音乐，可以通过按键跳过。
 * ----------------------------------------------------------------------------
 * 【使用说明】
 * 1、本插件不支持事件的插件指令。
 * 2、切换速度：指图片切换时的淡入淡出效果的速度。
 * 3、少于屏幕尺寸的图片将会居中。
 * 4、声音延迟和图片播放参数, 60帧 = 1秒
 * 5、9/19/2022新增播放BGM功能:
 *    每张图片可以设置播放BGM。图片切换时会自动播放下一组的BGM。
 *    如果需要整个OP过程只播放一首BGM，则设置第一组图片的BGM，其余图片组的BGM留空。
 *    OP结束会自动切换并播放标题画面设置的BGM，如不设置标题BGM则变为无声。
 *
 * ----------------------------------------------------------------------------
 * 【版本历史】
 * V 1.0 - 原始版本
 *
 * V 1.1.0
 * - 增加功能：播放图片时可同步播放音效
 * - 增加功能：可以延迟播放音效的时间
 * - 优化插件代码
 *
 * V 1.2.0
 * - 增加功能：播放图片时可播放BGM背景音乐。
 *
 * @param Display Time
 * @text 播放时间
 * @type number
 * @min 1
 * @desc 每组图片的播放时间。（60帧=1秒）
 * @default 360
 * 
 * @param Fade Speed
 * @text 切换速度
 * @type number
 * @min 1
 * @max 255
 * @desc 每组图片切换时淡入淡出效果的速度。
 * @default 2
 * 
 * @param Stop BGM After Splash
 * @text 切换时关闭BGM
 * @type boolean
 * @desc OP播放中切换图片时，自动关闭或继续播放BGM。（如果下一张图片带有BGM，则会自动切换播放新的BGM）
 * @default true
 *
 * @param Splashes
 * @text 图片组
 * @type struct<Splash>[]
 * @default []
 * @desc 设置播放的图片、音效和背景音乐。
*/
/*~struct~Splash:zh-CN
 * @param Image
 * @text 图片
 * @type file
 * @dir img/
 * @default
 * @desc 设置需要播放的图片。
 * 
 * @param Sound Effect
 * @text 音效
 * @type file
 * @dir audio/se
 * @desc 设置需要播放的音效。
 * 
 * @param BGM
 * @text 背景音乐
 * @type file
 * @dir audio/bgm
 * @desc 设置需要播放的BGM背景音乐。
 *
 * @param Sound Delay
 * @text 声音延迟
 * @type number
 * @min 0
 * @default 0
 * @desc 设置该组图片播放后延迟多少秒播放音效。（60帧=1秒）
*/
var Imported = Imported || {};
Imported.CGMZ_SplashScreen = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Splash Screen"] = "1.2.0";
CGMZ.SplashScreen = CGMZ.SplashScreen || {};
CGMZ.SplashScreen.parameters = PluginManager.parameters('CGMZ_SplashScreen');
CGMZ.SplashScreen.DisplayTime = Number(CGMZ.SplashScreen.parameters["Display Time"]);
CGMZ.SplashScreen.FadeSpeed = Number(CGMZ.SplashScreen.parameters["Fade Speed"]);
CGMZ.SplashScreen.StopBGMs = (CGMZ.SplashScreen.parameters["Stop BGM After Splash"] === 'true');
CGMZ.SplashScreen.Splashes = JSON.parse(CGMZ.SplashScreen.parameters["Splashes"]);
//=============================================================================
// CGMZ_Splash
//-----------------------------------------------------------------------------
// Object which stores splash data
//=============================================================================
function CGMZ_Splash() {
    this.initialize(...arguments);
}
CGMZ_Splash.prototype.constructor = CGMZ_Splash;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.initialize = function(splashData) {
	const splash = JSON.parse(splashData);
	this._imagePath = splash["Image"];
	this._se = splash["Sound Effect"];
	this._bgm = splash.BGM;
	this._soundDelay = splash["Sound Delay"];
	this.initImage();
};
//-----------------------------------------------------------------------------
// Initialize the image
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.initImage = function() {
	const separator = this._imagePath.lastIndexOf("/");
	const filename = this._imagePath.slice(separator+1);
	const folder = "img/" + this._imagePath.slice(0, separator+1);
	this._image = ImageManager.loadBitmap(folder, filename);
};
//-----------------------------------------------------------------------------
// Determine if this splash has an se
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.hasSound = function() {
	return !!this._se;
};
//-----------------------------------------------------------------------------
// Determine if this splash has a bgm
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.hasBGM = function() {
	return !!this._bgm;
};
//-----------------------------------------------------------------------------
// Get the splash image
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.getImage = function() {
	return this._image;
};
//-----------------------------------------------------------------------------
// Get the splash sound effect
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.getSe = function() {
	return this._se;
};
//-----------------------------------------------------------------------------
// Get the splash sound effect delay
//-----------------------------------------------------------------------------
CGMZ_Splash.prototype.getSoundDelay = function() {
	return this._soundDelay;
};
//=============================================================================
// CGMZ_Scene_SplashScreen
//-----------------------------------------------------------------------------
// Scene to show splash images and then transfer to title scene.
//=============================================================================
function CGMZ_Scene_SplashScreen() {
    this.initialize(...arguments);
}
CGMZ_Scene_SplashScreen.prototype = Object.create(Scene_Base.prototype);
CGMZ_Scene_SplashScreen.prototype.constructor = CGMZ_Scene_SplashScreen;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._timer = 0;
	this._fadeMode = 'none';
	this._fastFade = false;
	this._isReady = true;
	this._image = null;
	this._index = 0;
	this._hasSound = false;
	this._se = "";
	this._bgm = "";
	this._soundDelay = 0;
	this._soundPlayed = false;
	this._splashes = this.initSplashes();
};
//-----------------------------------------------------------------------------
// Initialize splash objects
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.initSplashes = function() {
    let splashes = [];
	CGMZ.SplashScreen.Splashes.forEach((splash) => {
		splashes.push(new CGMZ_Splash(splash));
	});
	return splashes;
};
//-----------------------------------------------------------------------------
// Create splash scene assets
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createImage();
};
//-----------------------------------------------------------------------------
// Create first splash image
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.createImage = function() {
    this._image = new Sprite(this._splashes[0].getImage());
	this._image.opacity = 0;
	this.addChild(this._image);
};
//-----------------------------------------------------------------------------
// Get the splash at the current index
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.splash = function() {
	return this._splashes[this._index];
};
//-----------------------------------------------------------------------------
// Change image bitmap to next image
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.setNewImage = function() {
	const splash = this.splash();
    this._image.bitmap = splash.getImage();
	this._image.opacity = 0;
	this._hasSound = splash.hasSound();
	this._hasBGM = splash.hasBGM();
	this._soundDelay = splash.getSoundDelay();
	this._se = {name: splash.getSe(), pan: 0, pitch: 100, volume: 100};
	this._bgm = {name: splash._bgm, pan: 0, pitch: 100, volume: 100};
	this._soundPlayed = false;
	AudioManager.stopSe();
	if(CGMZ.SplashScreen.StopBGMs) AudioManager.stopBgm();
};
//-----------------------------------------------------------------------------
// Update
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if(this._timer === 0) {
		this.updateLoad();
	} else {
		this.updateFade();
	}
	if(Input.isTriggered('ok') || TouchInput.isPressed()) {
		this._fadeMode = 'out';
		this._fastFade = true;
		if(CGMZ.SplashScreen.StopBGMs) AudioManager.fadeOutBgm(255/(CGMZ.SplashScreen.FadeSpeed*3)/60);
	}
	this.updateAudio();
};
//-----------------------------------------------------------------------------
// Update image loading (if none left, leave scene)
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.updateLoad = function() {
	if(this._isReady) {
		if(this._index >= CGMZ.SplashScreen.Splashes.length) {
			AudioManager.stopBgm();
			SceneManager.goto(Scene_Title);
			Window_TitleCommand.initCommandPosition();
		} else {
			this.setNewImage();
			this._isReady = false;
			this._index++;
		}
	}
	if(ImageManager.isReady()) {
		this.centerSprite(this._image);
		this._fadeMode = 'in';
		this._timer++;
	}
};
//-----------------------------------------------------------------------------
// Update image fade in/out
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.updateFade = function() {
	if(this._fadeMode === 'in') {
		if(this._image.opacity < 255) {
			this._image.opacity += CGMZ.SplashScreen.FadeSpeed;
		}
		this._timer++;
		if(this._timer >= CGMZ.SplashScreen.DisplayTime) {
			this._fadeMode = 'out';
			if(CGMZ.SplashScreen.StopBGMs) AudioManager.fadeOutBgm(255/CGMZ.SplashScreen.FadeSpeed/60);
		}
	}
	else if(this._fadeMode ==='out') {
		this._image.opacity -= CGMZ.SplashScreen.FadeSpeed;
		if(this._fastFade) {
			this._image.opacity -= CGMZ.SplashScreen.FadeSpeed*3;
		}
		if(this._image.opacity <= 0) {
			this._timer = 0;
			this._fadeMode = 'none';
			this._isReady = true;
			this._fastFade = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Update audio playing
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.updateAudio = function() {
	if((this._hasSound || this._hasBGM) && !this._soundPlayed && this._timer > this._soundDelay) {
		this._soundPlayed = true;
		if(this._hasSound) AudioManager.playSe(this._se);
		if(this._hasBGM) AudioManager.playBgm(this._bgm, 0);
	}
};
//-----------------------------------------------------------------------------
// Center Sprite
//-----------------------------------------------------------------------------
CGMZ_Scene_SplashScreen.prototype.centerSprite = function(sprite) {
	sprite.x = (Graphics._width - sprite.width) / 2;
	sprite.y = (Graphics._height - sprite.height) / 2;
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Change which scene begins the game
// Modifies: startNormalGame
//=============================================================================
//-----------------------------------------------------------------------------
// Alias: Change first scene unless no splash images
//-----------------------------------------------------------------------------
var alias_CGMZ_SplashScreen_SceneBoot_startNormalGame = Scene_Boot.prototype.start;
Scene_Boot.prototype.startNormalGame = function() {
	if(CGMZ.SplashScreen.Splashes.length < 1) {
		alias_CGMZ_SplashScreen_SceneBoot_startNormalGame.call(this);
	} else {
		this.checkPlayerLocation();
		DataManager.setupNewGame();
		SceneManager.goto(CGMZ_Scene_SplashScreen);
	}
};