import os
import cv2
import numpy as np

width = 640
height = 360
###########
vidcap = cv2.VideoCapture('wholealita.mp4')
vidcap.set(cv2.CAP_PROP_POS_FRAMES, 81758)
success, image = vidcap.read()
alita_images = []

max_frames = 160 * 30
j = max_frames

while success and j > 0:
    success, image = vidcap.read()
    alita_images.append(image)
    j = j - 1

#############

vidcap = cv2.VideoCapture('doubledoor.mp4')
# vidcap.set(cv2.CAP_PROP_POS_FRAMES, 81758)
success, image = vidcap.read()
will_images = []

j = max_frames

while success and j > 0:
    success, image = vidcap.read()
    will_images.append(image)
    j = j - 1

################



def make_colored_image(color):
    img = np.zeros((height, width, 3), np.uint8)
    img[:] = color
    return img


# B G R
black = make_colored_image((0, 0, 0))
white = make_colored_image((255, 255, 255))

frames = []

# quantity
# path or color
# to skip or not

for i in range(max_frames):
    if i % 5 == 0:
        frames.append(will_images[i])
    elif i % 5 == 1:
        frames.append(black)
    elif i % 5 == 2:
        frames.append(alita_images[i])
    elif i % 5 == 3:
        frames.append(alita_images[i])
    elif i % 5 == 4:
        frames.append(white)

    # np_frame = np.asarray(video_images[i], np.uint8)
    # frames.append(np_frame)
    # img = blue if i % 2 == 0 else red
    # frames.append(img)


# images = [img for img in os.listdir(image_folder) if img.endswith(".png")]
# frame = cv2.imread(os.path.join(image_folder, images[0]))
# height, width, layers = frame.shape
FPS = 29.97
fourcc = cv2.VideoWriter_fourcc(*'MP4V')
video = cv2.VideoWriter('./output.mp4', fourcc, float(FPS), (width, height))

for frame in frames:
    # print frame.shape
    video.write(frame)

cv2.destroyAllWindows()
video.release()
