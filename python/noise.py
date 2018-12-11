import numpy as np
from cv2 import VideoWriter, VideoWriter_fourcc

width = 1280
height = 720
FPS = 24
seconds = 10

# self._cap = VideoCapture(0)
# self._out = VideoWriter(self._name, self._fourcc, 20.0, (640, 480))


def make_colored_image(color):
    img = np.zeros((height, width, 3), np.uint8)
    img[:] = color
    return img


# B G R
blue = make_colored_image((255, 0, 0))
red = make_colored_image((0, 0, 255))

frames = []

for i in range(60):
    img = blue if i % 2 == 0 else red
    frames.append(img)


fourcc = VideoWriter_fourcc(*'MP4V')
video = VideoWriter('./noise.mp4', fourcc, float(FPS), (width, height))

# for _ in range(FPS*seconds):
# frame = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
# frame = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
# frame[:] = (255, 0, 0)
# video.write(frame)
for frame in frames:
    video.write(frame)
video.release()
