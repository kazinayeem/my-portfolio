import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-journey-robotics-raspberry-pi",
  title: "My Journey Into Robotics with Raspberry Pi",
  seoTitle: "My Journey Into Robotics with Raspberry Pi | Mohammad Ali Nayeem",
  subtitle: "How a DIU Software Engineering student turned a credit-card computer into a robotics lab",
  description: "Mohammad Ali Nayeem, DIU Software Engineering student and founder of Bornosoft, shares his hands-on journey learning robotics with Raspberry Pi—from first GPIO blink to camera-driven projects in Bangladesh.",
  category: "Raspberry Pi",
  tags: ["Raspberry Pi","Robotics","GPIO","DIU","Bangladesh","IoT"],
  keywords: ["raspberry pi robotics beginner","DIU robotics project","raspberry pi bangladesh student","GPIO python tutorial"],
  publishedAt: "2025-02-28",
  updatedAt: "2025-03-15",
  featured: false,
  popular: false,
  coverImageAlt: "Raspberry Pi board connected to sensors and a small robot chassis on a student desk",
  content: `<p>My name is <strong>Mohammad Ali Nayeem</strong>, a Software Engineering student at <strong>Daffodil International University (DIU)</strong> in Dhaka, Bangladesh, and founder of <strong>Bornosoft</strong>. Before I touched cloud consoles or Kubernetes YAML, the device that made engineering feel tangible was a <strong>Raspberry Pi</strong>—a credit-card computer that turned abstract code into motors spinning, LEDs blinking, and cameras seeing.</p>

<p>This article is my honest journey into robotics with Raspberry Pi: what I bought, what broke, what I learned in DIU labs, and how those lessons fed into larger Bornosoft and computer-vision projects. If you are a student in Bangladesh wondering whether robotics is affordable, the answer is yes—with patience, careful part selection, and realistic scope.</p>

<h2>Why Raspberry Pi for Robotics?</h2>

<p>Desktop PCs are powerful but terrible on a robot chassis. Microcontrollers like Arduino excel at real-time GPIO but struggle with cameras, networking, and running Python ML stacks. Raspberry Pi sits in the middle: full Linux, USB, Wi-Fi, HDMI, and enough CPU for OpenCV and lightweight inference.</p>

<p>At DIU, our robotics interest group needed a platform students could program in Python—the language we already used in Data Structures labs and web backends. Pi matched that constraint while letting us SSH in from a laptop without flashing firmware for every experiment.</p>

<div class="callout tip"><strong>Tip:</strong> Buy your Pi from a reputable local seller or official distributor. Counterfeit power supplies and fake boards cause mysterious crashes that waste weeks of debugging.</div>

<h2>My First Kit and Budget Reality</h2>

<p>My first serious purchase included:</p>

<ul>
<li>Raspberry Pi 4 Model B (4GB RAM)</li>
<li>Official USB-C power supply (5V 3A)</li>
<li>32GB Class 10 microSD card</li>
<li>GPIO breakout board and breadboard kit</li>
<li>HC-SR04 ultrasonic sensor, SG90 servo, L298N motor driver</li>
<li>Chassis kit with two DC motors and castor wheel</li>
</ul>

<p>In Dhaka component markets, prices fluctuate. I spent roughly what many students pay for a textbook—significant, but split across two months of saving from freelance curiosity work. The Pi became shared infrastructure: robotics club demos, home MQTT experiments, and a portable DNS test box.</p>

<h3>What I Wish I Knew Before Buying</h3>

<table>
<thead><tr><th>Component</th><th>Beginner Mistake</th><th>Better Approach</th></tr></thead>
<tbody>
<tr><td>Power supply</td><td>Phone charger</td><td>Rated 5V 3A USB-C</td></tr>
<tr><td>SD card</td><td>Unknown brand</td><td>SanDisk/Samsung with wear leveling</td></tr>
<tr><td>Motor driver</td><td>Direct GPIO to motors</td><td>L298N or TB6612 with separate supply</td></tr>
<tr><td>Camera</td><td>1080p expectation on Pi 3</td><td>Pi Camera Module v2 or USB cam with realistic FPS</td></tr>
</tbody>
</table>

<h2>From Blink to Bot: Learning GPIO</h2>

<p>Every robotics journey starts with LED blink. On Pi, I used <code>gpiozero</code> before dropping to <code>RPi.GPIO</code> when I needed finer timing control for servo PWM.</p>

<pre><code class="language-python">from gpiozero import Robot
from time import sleep

robot = Robot(left=(17, 27), right=(22, 23))

robot.forward()
sleep(2)
robot.stop()</code></pre>

<p>That ten-line script was more exciting than any console <code>Hello World</code>. Suddenly software engineering connected to physics: voltage drops, motor torque, wheel slip on tile versus carpet in the DIU project lab.</p>

<div class="callout note"><strong>Note:</strong> Pi GPIO pins are 3.3V logic. Many sensors are 5V tolerant on inputs but never drive 5V into output pins without level shifting.</div>

<h2>Building My First Rover</h2>

<p>Our first rover goal was modest: forward, backward, turn, stop—controlled from a Flask web page on the local network during a department open day. Architecture:</p>

<ol>
<li>Flask app on Pi serving a simple HTML controller</li>
<li><code>gpiozero.Robot</code> wired through L298N to geared DC motors</li>
<li>Ultrasonic sensor loop in a background thread for emergency stop</li>
<li>Phone connected to campus Wi-Fi hitting <code>http://pi.local:5000</code></li>
</ol>

<p>Demo day taught humility. Wi-Fi latency made controls feel mushy. Battery voltage sagged after twenty minutes. A loose jumper wire caused intermittent left-turn-only behavior that looked intentional until we inspected connections.</p>

<div class="callout warning"><strong>Warning:</strong> Never run motor power through the Pi's 5V pin without understanding current draw. Stall current can brown out the board and corrupt your SD card.</div>

<h2>Adding Vision: Camera Modules and OpenCV</h2>

<p>Once locomotion worked, we mounted a Pi Camera and streamed MJPEG to a laptop. OpenCV handled edge detection and color masking before we attempted ML. Frame rates dropped quickly at 720p; we learned to crop regions of interest and downscale early in the pipeline.</p>

<pre><code class="language-python">import cv2
from picamera2 import Picamera2

picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(main={"size": (640, 480)}))
picam2.start()

while True:
    frame = picam2.capture_array()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 80, 160)
    cv2.imshow("edges", edges)
    if cv2.waitKey(1) == ord("q"):
        break</code></pre>

<p>This bridge from GPIO robotics to computer vision led directly to my YOLO experiments and the smart road monitoring system I later documented. The Pi was not the final production edge device, but it was the classroom where intuition formed.</p>

<h2>Networking, SSH, and Headless Workflow</h2>

<p>Dragging a monitor to every lab session was impractical. I configured headless boot: enable SSH, set hostname, static IP reservation on the router, and Samba for quick file drops. <code>systemd</code> services auto-started robot control scripts on boot—my first taste of operations engineering.</p>

<h3>Useful Commands I Still Run</h3>

<pre><code class="language-bash"># Check temperature throttling
vcgencmd measure_temp

# GPIO pin state (with wiringpi or libgpiod tools)
pinctrl get

# Service logs for robot app
journalctl -u bornosoft-rover -f</code></pre>

<h2>Integrating Sensors Beyond Ultrasonic</h2>

<p>We experimented with MPU6050 IMU modules for orientation, IR line sensors for track following, and encoder disks for odometry. Each sensor added noise and calibration work. Software Engineering curriculum rarely emphasizes Kalman filters, but robotics forces you to learn them—or accept drift.</p>

<p>I kept a lab notebook (digital, in Git) with wiring diagrams, resistance values, and failure photos. That habit later matched how I document Bornosoft infrastructure changes.</p>

<h2>Power Budgeting on Student Projects</h2>

<p>Mobile robots need portable power. 18650 packs with proper BMS boards worked for short demos; lead-acid was heavy but stable for stationary edge nodes. We calculated approximate draw:</p>

<ul>
<li>Pi 4 idle: ~600mA</li>
<li>Two motors under load: 1–2A peaks</li>
<li>Camera module: +200–300mA</li>
</ul>

<p>Undersized batteries caused voltage dips that reset USB devices mid-inference—maddening to debug without a multimeter.</p>

<h2>Software Stack I Settled On</h2>

<p>Over semesters, my robotics Pi stack stabilized:</p>

<ul>
<li><strong>OS:</strong> Raspberry Pi OS Lite (64-bit)</li>
<li><strong>Language:</strong> Python 3.11+</li>
<li><strong>Vision:</strong> OpenCV, later Ultralytics for YOLO</li>
<li><strong>Web control:</strong> Flask → FastAPI as projects grew</li>
<li><strong>Messaging:</strong> MQTT for sensor telemetry experiments</li>
<li><strong>Deploy:</strong> Docker only on Pi 4 with 4GB+ when images stayed slim</li>
</ul>

<h2>Connecting Robotics to Bornosoft and DIU Coursework</h2>

<p>Not every course aligned with robotics, but overlaps appeared. Operating Systems labs on processes and threads mirrored multi-sensor threading. Computer Networks made MQTT and HTTP debugging intelligible. Software Architecture discussions improved how we split perception, planning, and control modules—even in toy rovers.</p>

<p>At Bornosoft, client IoT prototypes occasionally reused Pi gateways for proof-of-concept demos before moving to industrial hardware. The Pi let us validate software pipelines cheaply.</p>

<h2>Common Failures and How I Fixed Them</h2>

<ol>
<li><strong>Corrupted SD card</strong> — Image backups weekly; switch to USB boot on supported models when budget allows.</li>
<li><strong>GPIO permission errors</strong> — Add user to <code>gpio</code> group; prefer <code>gpiozero</code> abstractions.</li>
<li><strong>Camera not detected</strong> — Enable interface in <code>raspi-config</code>; check ribbon cable orientation.</li>
<li><strong>Thermal throttling</strong> — Heatsinks, airflow, reduce CPU governor during long inference.</li>
</ol>

<h2>What I Would Tell New DIU Robotics Students</h2>

<p>Start small, document obsessively, and pair with someone who owns a multimeter. Join club build nights. Reuse code across semesters. Publish a three-minute demo video—recruiters and internship panels remember motion more than slides.</p>

<p>Raspberry Pi did not make me a roboticist overnight. It made engineering visceral. Every bug had a physical symptom; every fix had a measurable outcome. That feedback loop is why I still recommend Pi as the first robotics computer for Bangladeshi students balancing cost and capability.</p>

<h2>Conclusion</h2>

<p>My journey into robotics with Raspberry Pi began with blinking LEDs and ended up connecting to YOLO road monitoring, MQTT telemetry, and Bornosoft IoT prototypes. The Pi is not the most powerful or the most real-time platform—but it is the most educational per taka spent in my experience.</p>

<p>If you are at DIU or any Bangladesh university with curiosity and a modest budget, buy one good power supply, one honest SD card, and build something that moves. The rest of your Software Engineering path—cloud, DevOps, AI—will feel more grounded when you have shipped electrons, not just npm packages.</p>

<p>Questions about wiring, Python stacks, or club project ideas? Reach me at <a href="https://kazinayeem.site">kazinayeem.site</a>. Happy building.</p>`,
  faqs: [
      {
          "question": "Which Raspberry Pi model is best for robotics beginners?",
          "answer": "A Raspberry Pi 4 with 4GB RAM is the sweet spot for most student robotics projects. It handles camera streams, Python control loops, and light inference without constant swapping. Pi 5 is faster but costs more in Dhaka markets."
      },
      {
          "question": "Do I need soldering skills to start?",
          "answer": "No. Start with a breadboard, jumper wires, and modules that expose pin headers. Soldering becomes useful when you design custom motor driver boards or permanent installations."
      },
      {
          "question": "Can Raspberry Pi run YOLO for robotics?",
          "answer": "Yes, with realistic expectations. Lightweight YOLO variants and TensorFlow Lite models run on Pi 4/5 for moderate frame rates. Heavy training still belongs on a laptop or cloud GPU."
      },
      {
          "question": "What power supply mistakes should I avoid?",
          "answer": "Underrated USB-C adapters cause brownouts that corrupt SD cards mid-demo. Use a dedicated 5V 3A supply, separate motor power from logic power, and add capacitors on motor rails when possible."
      }
  ],
  relatedSlugs: ["yolo-object-detection-explained-beginners","how-i-built-smart-road-monitoring-system","my-software-engineering-journey-diu"],
});

export default post;
