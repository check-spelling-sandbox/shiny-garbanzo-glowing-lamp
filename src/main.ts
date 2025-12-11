import { DefaultArtifactClient } from '@actions/artifact';
import * as core from '@actions/core';
import * as path from 'path';

/**
 * Uploads a list of files as a GitHub Artifact.
 * * @param artifactName - The name of the artifact to create
 * @param files - Array of file paths to include
 * @param rootDir - The root directory to upload from (usually current workspace)
 */
async function uploadBuildArtifact(artifactName: string, files: string[], rootDir: string) {
    try {
        const client = new DefaultArtifactClient();

        core.info(`Starting upload for artifact: ${artifactName}`);

        // The uploadArtifact method returns details about the upload
        const { id, size } = await client.uploadArtifact(
            artifactName,
            files,
            rootDir
        );

        core.info(`Artifact uploaded successfully!`);
        core.info(`Artifact ID: ${id}`);
        core.info(`Total Size: ${size} bytes`);

    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(`Failed to upload artifact: ${error.message}`);
        } else {
            core.setFailed('An unexpected error occurred during upload.');
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