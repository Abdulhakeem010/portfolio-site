This folder is where the Journey section's photos live once you download them.

Right now it's empty, and the site is still working fine — the CSS is written so
each journey photo tries a file in this folder FIRST, and automatically falls
back to the hosted Wikimedia Commons original if the local file isn't there.
That means nothing breaks today, and the moment you drop a matching file in
here, the site switches to it automatically — no code changes needed.

Save each image below with the exact filename shown, into this folder:

1. 2023-difference-engine.jpg
   Charles Babbage's Difference Engine No. 2 (Science Museum reconstruction)
   Download page: https://commons.wikimedia.org/wiki/File:Babbage_Difference_Engine.jpg
   Credit: Photo by User:geni, CC BY-SA 4.0 / 3.0 / 2.5 / 2.0 / 1.0

2. 2024-first-transistor.jpg
   The first transistor ever made, Bell Labs, 1947
   Download page: https://commons.wikimedia.org/wiki/File:The_First_Transistor_ever_made,_built_in_1947_-_Bell_Labs.jpg
   Credit: Windell Oskay, uploaded to Commons

3. 2025-first-web-server.jpg
   The NeXT workstation Tim Berners-Lee used as the first web server at CERN
   Download page: https://commons.wikimedia.org/wiki/File:First_Web_Server.jpg
   Credit: CERN / Wikimedia Commons

4. 2026-humanoid-robot.jpg
   A humanoid robot, for the generative AI / advanced automation era
   Download page: https://commons.wikimedia.org/wiki/File:Humanoid_robot_at_Science_Square_Tsukuba_4.jpg
   Credit: Syced, released under CC0 (public domain)

How to grab each one: open the "Download page" link, click through to the
full-resolution image, save it, then rename it to the filename listed above.

Why this file exists instead of the images themselves: the assistant that
built this site runs in a sandbox with no general internet access for saving
files, so it could not download the actual image bytes into this folder —
only reference their web addresses. Hotlinking to Wikimedia Commons works
fine as a stand-in, but pulling the real files in here means the site keeps
working even if Commons is ever slow, offline, or the file gets moved.
