import { DefaultArtifactClient } from '@actions/artifact';

function info(message: string) {
    console.log(`::notice ::${message}`);
}

function setFailed(message: string) {
    console.log(`::error ::${message}`);
    process.exit(1);
}

/**
 * Uploads a list of files as a GitHub Artifact.
 * * @param artifactName - The name of the artifact to create
 * @param files - Array of file paths to include
 * @param rootDir - The root directory to upload from (usually current workspace)
 */
async function uploadBuildArtifact(artifactName: string, files: string[], rootDir: string) {
    try {
        const client = new DefaultArtifactClient();

        info(`Starting upload for artifact: ${artifactName}`);

        // The uploadArtifact method returns details about the upload
        const { id, size } = await client.uploadArtifact(
            artifactName,
            files,
            rootDir
        );

        info(`Artifact uploaded successfully!`);
        info(`Artifact ID: ${id}`);
        info(`Total Size: ${size} bytes`);

    } catch (error) {
        if (error instanceof Error) {
            setFailed(`Failed to upload artifact: ${error.message}`);
        } else {
            setFailed('An unexpected error occurred during upload.');
        }
    }
}

// --- Execution Entry Point ---

// In a real GitHub Action, you would likely get these from core.getInput()
// For this standalone demonstration, we define them here.
const ARTIFACT_NAME = 'my-standalone-build';
const FILES_TO_UPLOAD = ['dist/index.js', 'package.json'];
const ROOT_DIR = '.';

// Execute
uploadBuildArtifact(ARTIFACT_NAME, FILES_TO_UPLOAD, ROOT_DIR);