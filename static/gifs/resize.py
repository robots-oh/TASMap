from PIL import Image
import os


data_root = r"D:\workspace\difficult\git\TASMap\static\gifs"
new_size = 170

for concpet in os.listdir(data_root):
    if not os.path.isdir(os.path.join(data_root, concpet)): continue
    for gif in os.listdir(os.path.join(data_root, concpet)):
        input_path = os.path.join(data_root, concpet, gif)
        output_path = os.path.join(data_root, concpet, f'{os.path.splitext(gif)[0]}_{new_size}.gif') 

        gif = Image.open(input_path)

        # 각 프레임을 순회하면서 크기 조정
        frames = []
        try:
            while True:
                frame = gif.copy()
                frame = frame.resize((new_size, new_size), Image.Resampling.LANCZOS)  # 크기 조정
                frames.append(frame)
                gif.seek(gif.tell() + 1)  # 다음 프레임으로 이동
        except EOFError:
            pass  # GIF의 마지막 프레임에 도달

        frames[0].save(output_path, save_all=True, append_images=frames[1:], loop=0)
        print(f"Resized GIF saved at: {output_path}")
