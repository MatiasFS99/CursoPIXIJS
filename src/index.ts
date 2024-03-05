import { Application, Assets, AssetsManifest, Sprite } from 'pixi.js'





const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});
async function init() {
	const manifest:AssetsManifest  = {
		bundles: [
			{
				name : "Sprites",
				assets:
				{
					"Clampy" : "./clampy.png",
					"ConitoCrab" : "./CCrab.png",
				}
			},
		]
	}
    // Assets.init must only happen once! 
    // Pack all your bundles into one manifest!
    await Assets.init({ manifest: manifest });

    DrawScreen(); 
}

init();

async function DrawScreen(){
	const Sprites = await Assets.loadBundle("Sprites");

	const clampy: Sprite = Sprite.from(Sprites.Clampy);
	const crab: Sprite = Sprite.from("ConitoCrab");
	
	console.log(clampy.width + " " + clampy.height);
	clampy.anchor.set(0);
	
	clampy.x = app.screen.width / 4;
	clampy.y = app.screen.height / 4;
	clampy.scale.set(0.25);

	crab.x = (app.screen.width / 4)*2;
	crab.y = (app.screen.height / 4)*2;
	crab.scale.set(0.25);

	app.stage.addChild(clampy);
	app.stage.addChild(crab);
}



