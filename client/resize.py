from PIL import Image
import os

source_image_path = r"C:\Users\hp\.gemini\antigravity\brain\efffd16c-212d-4474-b4f7-58a433db6d63\media__1782109487627.png"
public_dir = r"e:\a20\nisabmohd-Medium-clone-ba7f383\client\public"

if not os.path.exists(public_dir):
    os.makedirs(public_dir)

img = Image.open(source_image_path)

# Generate logo.png (full size, or at least 512x512)
img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
img_512.save(os.path.join(public_dir, "logo.png"), format="PNG")
img_512.save(os.path.join(public_dir, "icon-512.png"), format="PNG")

# Generate 192x192
img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img_192.save(os.path.join(public_dir, "icon-192.png"), format="PNG")

# Generate 180x180
img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
img_180.save(os.path.join(public_dir, "apple-touch-icon.png"), format="PNG")

# Generate 32x32
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(os.path.join(public_dir, "favicon-32x32.png"), format="PNG")

# Generate 16x16 ico
img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_16.save(os.path.join(public_dir, "favicon.ico"), format="ICO")

print("Favicons generated successfully.")
