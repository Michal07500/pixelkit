// Instagram week · Day 7 (Sun) · Free lesson promo
export default {
  id: "ig-day7-free-lesson",
  format: "portrait",
  badge: "FREE LESSON",
  style: "adhd",
  music: "phonk",
  musicDb: -21,
  speed: 1.18,
  segments: [
    {
      scene: { broll: "logo-build", sticker: "🎬", type: "statement", text: "Every big game opens with a *logo intro.*" },
      say: "Every big game opens with a logo intro.",
    },
    {
      scene: { sticker: "⏱️", type: "punch", text: "Yours can too. *10 min.*" },
      say: "Yours can too. In ten minutes!",
    },
    {
      scene: { type: "code", file: "ReplicatedFirst / IntroSplash", code: `ReplicatedFirst:RemoveDefaultLoadingScreen()\n\nlocal fadeIn = TweenService:Create(logo,\n\tTweenInfo.new(0.25, Enum.EasingStyle.Back),\n\t{ ImageTransparency = 0 })\nfadeIn:Play()`, steps: [[1, 1], [3, 6]] },
      say: ["Kill the default loading screen.", "Fade your logo in with a little pop. That's the feeling of a real studio."],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "The free lesson *covers*", items: ["Uploading your logo", "The full script, explained", "Scale, AnchorPoint, Tweens", "Testing on mobile"] },
      say: ["The free lesson covers", "uploading your logo,", "the full script, explained,", "three UI skills you'll use forever,", "and testing on mobile."],
    },
    {
      scene: { sticker: "🎁", type: "cta", title: "Get it *free.*", sub: "PDF + narrated video", button: "LINK IN BIO" },
      say: "It's free. Grab it now. Link in bio!",
    },
  ],
};
