export const crosspostingHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best Social Media Crossposting Tool to Save Time | shrt.name</title>
  <meta name="description" content="Discover why you need a reliable social media crossposting tool to multiply your reach without the extra effort. Meet CrosspostingPal, the ultimate solution.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    /* ═══════════════════════════════════════════════════════════════════
       SHRT.NAME // SYNTHWAVE AESTHETIC FOR SEO PAGE
       ═══════════════════════════════════════════════════════════════════ */
    :root {
      --bg-void: #050508;
      --bg-surface: rgba(16, 16, 28, 0.6);
      --bg-glass: rgba(26, 26, 46, 0.4);
      --neon-cyan: #0ff0fc;
      --neon-magenta: #ff00ff;
      --neon-purple: #9d00ff;
      --neon-green: #00ffaa;
      --text-primary: #ffffff;
      --text-secondary: #a9b1d6;
      --text-muted: #565f89;
      --font-display: 'Orbitron', system-ui, sans-serif;
      --font-mono: 'Space Mono', monospace;
    }
    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: var(--font-mono);
      background-color: var(--bg-void);
      background-image: 
        linear-gradient(rgba(15, 240, 252, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 240, 252, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 50% 0%, rgba(157, 0, 255, 0.15) 0%, transparent 60%);
      background-size: 40px 40px, 40px 40px, 100% 100%;
      background-position: center top;
      background-attachment: fixed;
      color: var(--text-primary);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      line-height: 1.8;
      overflow-x: hidden;
    }
    body::after {
      content: " ";
      display: block;
      position: fixed;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      z-index: 999;
      background-size: 100% 2px, 3px 100%;
      pointer-events: none;
      opacity: 0.6;
    }
    .container {
      max-width: 800px;
      width: 100%;
      position: relative;
      z-index: 10;
      margin: 2rem auto;
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.5rem, 8vw, 4rem);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .logo-prefix { color: #fff; text-shadow: 0 0 10px #fff, 0 0 20px var(--neon-cyan); }
    .logo-separator { color: var(--neon-magenta); text-shadow: 0 0 10px var(--neon-magenta); margin: 0 0.1em; }
    .logo-suffix { color: #fff; text-shadow: 0 0 10px #fff, 0 0 20px var(--neon-purple); }
    
    .content-box {
      background: var(--bg-glass);
      padding: 3rem;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(12px) saturate(180%);
      position: relative;
    }
    .content-box::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
    }
    h1, h2, h3 {
      font-family: var(--font-display);
      color: var(--neon-cyan);
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    h1 {
      font-size: 2rem;
      text-align: center;
      margin-top: 0;
      color: #fff;
      text-shadow: 0 0 15px var(--neon-cyan);
    }
    p {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
    }
    ul {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      padding-left: 1.5rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
    .cta-button {
      display: inline-block;
      width: 100%;
      text-align: center;
      padding: 1.5rem;
      margin-top: 2rem;
      font-family: var(--font-display);
      font-size: 1.125rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #fff;
      background: linear-gradient(135deg, rgba(255, 0, 255, 0.2), rgba(157, 0, 255, 0.2));
      border: 1px solid var(--neon-magenta);
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s;
      box-shadow: 0 0 20px rgba(255, 0, 255, 0.1);
      position: relative;
      overflow: hidden;
    }
    .cta-button::before {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transform: skewX(-20deg);
      transition: 0.5s;
    }
    .cta-button:hover {
      border-color: var(--neon-cyan);
      background: linear-gradient(135deg, rgba(15, 240, 252, 0.3), rgba(255, 0, 255, 0.3));
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(15, 240, 252, 0.3), 0 0 40px rgba(255, 0, 255, 0.2);
    }
    .cta-button:hover::before {
      left: 150%;
    }
    .back-btn {
      display: inline-block;
      margin-top: 2rem;
      color: var(--neon-cyan);
      text-decoration: none;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: color 0.2s;
    }
    .back-btn:hover {
      color: #fff;
      text-shadow: 0 0 10px var(--neon-cyan);
    }
  </style>
</head>
<body>

  <div class="container">
    <header class="header">
      <div class="logo">
        <span class="logo-prefix">SHRT</span><span class="logo-separator">//</span><span class="logo-suffix">NAME</span>
      </div>
    </header>

    <div class="content-box">
      <h1>The Best Social Media Crossposting Tool in 2026</h1>
      
      <p>If you're creating content for the internet, you know that maximizing your reach is essential. Posting to a single platform is no longer enough. You need to be on Twitter/X, LinkedIn, Facebook, Instagram, and more. But doing this manually is incredibly time-consuming. That's why finding the right <strong>social media crossposting tool</strong> is a game changer.</p>

      <h2>Why You Need to Crosspost Your Content</h2>
      <p>Crossposting allows you to syndicate one piece of content across multiple social networks simultaneously. Here's why you should be doing it:</p>
      <ul>
        <li><strong>Save Time:</strong> Stop copying, pasting, and manually reformatting the same post for five different platforms.</li>
        <li><strong>Maximize Reach:</strong> Your audience is fractured across different networks. Hitting all of them ensures maximum visibility.</li>
        <li><strong>Consistent Branding:</strong> Maintain an active presence effortlessly across your entire digital footprint.</li>
      </ul>

      <h2>Choosing the Right Tool</h2>
      <p>A good social network scheduler needs to be fast, reliable, and support all the platforms that matter to you. You want a tool that allows you to tailor your posts per platform or just broadcast a single message everywhere instantly.</p>

      <h2>Introducing CrosspostingPal</h2>
      <p>We highly recommend <strong>CrosspostingPal</strong>. It's built for creators, marketers, and businesses who want to streamline their social media workflow without dealing with clunky, overly complex enterprise software.</p>
      
      <p>Whether you're launching a new product, sharing an article, or just staying engaged with your followers, CrosspostingPal handles the heavy lifting so you don't have to.</p>

      <a href="https://crosspostingpal.com/?ref=shrt.name" target="_blank" class="cta-button">
        Try CrosspostingPal Now
      </a>
      
      <div style="text-align: center;">
        <a href="/" class="back-btn">← Back to shrt.name</a>
      </div>
    </div>
  </div>

</body>
</html>`;
