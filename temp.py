import open3d as o3d
import numpy as np

# 구의 매개변수
radius = 1.0
num_points = 1000

# 구의 포인트 생성
phi = np.random.uniform(0, np.pi, num_points)
theta = np.random.uniform(0, 2 * np.pi, num_points)
x = radius * np.sin(phi) * np.cos(theta)
y = radius * np.sin(phi) * np.sin(theta)
z = radius * np.cos(phi)

# RGB 값 생성 (무작위)
colors = np.random.rand(num_points, 3)

# 포인트 클라우드 생성
points = np.vstack((x, y, z)).T
pcd = o3d.geometry.PointCloud()
pcd.points = o3d.utility.Vector3dVector(points)
pcd.colors = o3d.utility.Vector3dVector(colors)

# 포인트 클라우드를 PLY 파일로 저장
o3d.io.write_point_cloud("sphere_point_cloud.ply", pcd)

# 포인트 클라우드 시각화 (선택 사항)
o3d.visualization.draw_geometries([pcd])
