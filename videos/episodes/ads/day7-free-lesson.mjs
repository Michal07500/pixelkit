// Instagram week · Day 7 (Sun) · Free lesson promo
export default {
  id: "ig-day7-free-lesson",
  format: "portrait",
  badge: "FREE LESSON",
  music: "hype",
  speed: 1.06,
  segments: [
    {
      scene: { type: "statement", text: "Big games start with a *logo intro.*", sub: "Yours can too, in 10 minutes." },
      say: ["Every big game starts with a logo intro.", "Yours can too, in ten minutes."],
    },
    {
      scene: { type: "code", file: "ReplicatedFirst / IntroSplash", code: `ReplicatedFirst:RemoveDefaultLoadingScreen()\n\nlocal fadeIn = TweenService:Create(logo,\n\tTweenInfo.new(0.25, Enum.EasingStyle.Back),\n\t{ ImageTransparency = 0 })\nfadeIn:Play()`, steps: [[1, 1], [3, 6]] },
      say: ["Remove the default loading screen.", "Then fade your logo in with TweenService, with a little pop."],
    },
    {
      scene: { type: "checklist", headingBeat: true, heading: "The free lesson *covers*", items: ["Uploading your logo", "The full script, explained", "Scale, AnchorPoint, Tweens", "Testing on mobile"] },
      say: ["The free lesson covers", "uploading your logo,", "the full script, explained,", "three UI concepts you'll use forever,", "and testing on mobile."],
    },
    {
      scene: { type: "cta", title: "Get it *free.*", sub: "PDF + narrated video", button: "LINK IN BIO" },
      say: "Get it free. Link in bio.",
    },
  ],
};
