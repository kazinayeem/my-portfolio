import { createPost } from "../article-builder";

const post = createPost({
  slug: "my-first-machine-learning-project-yolo-robotics",
  title: "My First Machine Learning Project with YOLO & Robotics",
  seoTitle: "My First ML Project: YOLO & Robotics | Mohammad Ali Nayeem",
  subtitle: "From classroom theory to a real Raspberry Pi + camera pipeline",
  description: "Mohammad Ali Nayeem shares how he built his first machine learning project combining YOLO object detection with robotics using Raspberry Pi, OpenCV, and lessons from DIU coursework.",
  category: "Machine Learning",
  tags: ["YOLO","Robotics","Raspberry Pi","Computer Vision","ML"],
  keywords: ["YOLO robotics project","machine learning student Bangladesh","Mohammad Ali Nayeem ML"],
  publishedAt: "2024-09-02",
  updatedAt: "2025-05-20",
  featured: true,
  popular: false,
  coverImageAlt: "My First Machine Learning Project with YOLO & Robotics - cover image by Mohammad Ali Nayeem",
  relatedSlugs: ["yolo-object-detection-explained-beginners","my-journey-robotics-raspberry-pi"],
  faqs: [
  {
    "question": "Which YOLO version should beginners use?",
    "answer": "YOLOv8 from Ultralytics is beginner-friendly with great docs, pretrained weights, and easy export options for edge devices."
  },
  {
    "question": "Do I need a GPU for YOLO?",
    "answer": "Training benefits from a GPU, but you can start with pretrained models on CPU or Google Colab free tier."
  },
  {
    "question": "Can Raspberry Pi run YOLO?",
    "answer": "Yes, with optimized models (YOLOv8n) and TensorRT or ONNX runtime, though frame rates will be modest."
  }
],
  content: `<p>Machine learning felt abstract until I connected a camera to a motor. My first end-to-end ML project combined YOLO object detection with a simple robotics chassis—and it taught me more than any single lecture at DIU.</p>

<h2>Project Goal</h2>

<p>I wanted a mobile robot that could detect specific objects (traffic cones and pedestrians) and log detections for a smart road monitoring prototype. This became the foundation for later Bornosoft experiments in computer vision.</p>

<h2>Hardware Stack</h2>

<ul><li>Raspberry Pi 4 (4GB RAM)</li><li>Pi Camera Module v2</li><li>Motor driver H-bridge (L298N)</li><li>Chassis kit with DC motors</li><li>Power bank + regulated 5V supply</li></ul>

<h2>Software Pipeline</h2>

<pre><code class="language-python">from ultralytics import YOLO
import cv2

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    results = model(frame, classes=[0, 9])
    annotated = results[0].plot()
    cv2.imshow('YOLO Robotics', annotated)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break</code></pre>

<h2>Challenges I Faced</h2>

<p>Frame rate on Raspberry Pi was painful at first—2-3 FPS with the default model. I learned about model quantization, smaller input sizes, and running inference every Nth frame while the robot moves on dead reckoning between frames.</p>

<div class="callout note"><strong>Note:</strong> Start with pretrained COCO weights before collecting custom data. Validate the pipeline works end-to-end first.</div>

<h2>Dataset & Fine-Tuning</h2>

<p>For road-specific objects, I captured 200 images around campus and labeled them in Roboflow. Fine-tuning YOLOv8n for 50 epochs on Colab improved mAP noticeably.</p>

<h2>Robotics Integration</h2>

<p>Detection alone is not robotics. I added simple state machine logic: if a cone is centered in frame, stop; if offset left, turn left. This naive approach was enough for demos and taught me the gap between demo and production.</p>

<h2>What I Would Do Differently</h2>

<ul><li>Log telemetry from day one (FPS, inference ms, battery voltage)</li><li>Use ROS 2 earlier for cleaner sensor abstraction</li><li>Build a proper calibration routine for camera mount angle</li></ul>

<h2>Conclusion</h2>

<p>My first YOLO + robotics project was messy, slow, and unforgettable. It bridged AI theory and physical systems—and pushed me toward DevOps and MLOps so I could deploy models reliably, not just train them in notebooks.</p>`,
});

export default post;
