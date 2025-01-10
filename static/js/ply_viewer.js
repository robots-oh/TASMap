// Scene creation
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Camera setup
const viewer = document.getElementById('ply_viewer');
const width = viewer.clientWidth;
const height = viewer.clientHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 7;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); // Set renderer size to the viewer dimensions
viewer.appendChild(renderer.domElement); // Append the renderer to the viewer

// OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 4.5); // Increased intensity
scene.add(ambientLight);

// Set the directional light to shine from above
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Increased intensity
directionalLight.position.set(-10, 10, 0); // Position it above the scene
directionalLight.target.position.set(0, 0, 0); // Set the target to the center of the scene
scene.add(directionalLight);
scene.add(directionalLight.target); // Add the target to the scene

// PLY loading function
const loadPLY = (url, onLoad) => {
    const loader = new THREE.PLYLoader();
    loader.load(url, function (geometry) {
        geometry.computeVertexNormals();
        onLoad(geometry);
    });
};

// PLY sets
const plySets = {
    set1: {
        ply1: './static/ply/pcd_shower_2a_liv.ply', // Replace with actual PLY file for set 1
        ply2: './static/ply/mesh_shower_2a_liv.ply'  // Replace with actual PLY file for set 1
    },
    set2: {
        ply1: './static/ply/homegym_2a.ply', 
        ply2: './static/ply/mesh_shower_2a_liv.ply'
    },
    set3: {
        ply1: './static/ply/stinky_22c.ply', 
        ply2: './static/ply/mesh_shower_2a_liv.ply'
    },
    set4: {
        ply1: './static/ply/shower_0c1.ply', 
        ply2: './static/ply/mesh_shower_2a_liv.ply'
    },
};


let currentPly1, currentPly2;

// Function to load and display PLY
const loadAndDisplayPLYSet = (set) => {
    const { ply1, ply2 } = plySets[set];

    if (currentPly1) {
        scene.remove(currentPly1);
    }
    if (currentPly2) {
        scene.remove(currentPly2);
    }

    // Load PLY1 as points
    loadPLY(ply1, (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true, // Enable transparency
            opacity: 1.0 // Fully opaque
        });
        currentPly1 = new THREE.Points(geometry, material);
        scene.add(currentPly1);
    });

    // Load PLY2 as a mesh with vertex colors
    loadPLY(ply2, (geometry) => {
        geometry.computeVertexNormals();
        
        // Create a material that uses vertex colors with a white background
        const material = new THREE.MeshStandardMaterial({
            vertexColors: true, // Enable vertex colors
            transparent: true, // Enable transparency
            opacity: 1.0, // Fully opaque
            color: 0xffffff // Set mesh color to white
        });

        currentPly2 = new THREE.Mesh(geometry, material);
        currentPly2.visible = true; // Set to visible
        scene.add(currentPly2);
    });
};

// Load the initial set
loadAndDisplayPLYSet(document.getElementById('ply-set-select').value);

// Dropdown change event
const plySetSelect = document.getElementById('ply-set-select');
plySetSelect.addEventListener('change', () => {
    loadAndDisplayPLYSet(plySetSelect.value);
});

// Toggle button event
const toggleButton = document.getElementById('toggle-ply2');
toggleButton.addEventListener('click', () => {
    if (currentPly2) {
        currentPly2.visible = !currentPly2.visible; // Toggle visibility
    }
});

// Function to set camera to top-down view
const setTopDownView = () => {
    camera.position.set(0, 0, 10); // Adjust the position for top-down view
    camera.rotation.set(-Math.PI / 2, 0, 0); // Point the camera directly downwards
    camera.updateProjectionMatrix(); // Update projection matrix
};

// Add event listener for the top-down view button
const topDownButton = document.getElementById('top-down-view');
topDownButton.addEventListener('click', setTopDownView);

// Responsive resizing
window.addEventListener('resize', () => {
    const width = viewer.clientWidth; // Use viewer dimensions for resizing
    const height = viewer.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
