from PIL import Image
import cv2
import numpy as np

def resize_gif(input_path, output_path, size=(300, 300)):
    # GIF 파일을 열기
    gif = Image.open(input_path)
    frames = []
    
    # 모든 프레임을 순회
    for frame in range(gif.n_frames):
        gif.seek(frame)
        # 프레임을 배열로 변환하여 OpenCV에서 사용할 수 있도록 함
        frame_image = gif.convert('RGB')
        open_cv_image = np.array(frame_image)
        # BGR 형식으로 변환
        open_cv_image = open_cv_image[:, :, ::-1].copy()
        
        # OpenCV를 사용하여 리사이즈
        resized_frame = cv2.resize(open_cv_image, size)
        
        # 리사이즈된 프레임을 PIL 이미지로 변환
        resized_frame_image = Image.fromarray(cv2.cvtColor(resized_frame, cv2.COLOR_BGR2RGB))
        frames.append(resized_frame_image)
    
    # GIF 파일로 저장
    frames[0].save(output_path, save_all=True, append_images=frames[1:], loop=0, duration=gif.info['duration'])

# 사용 예시
resize_gif(r'D:\workspace\difficult\git\TASMap\static\gifs\0c1_PRRT.gif', 'output.gif')
