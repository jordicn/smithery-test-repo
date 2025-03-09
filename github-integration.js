// GitHub Integration Example with Smithery and MCP

// Import required libraries
const { createClient } = require('@smithery/client');

// Function to initialize the Smithery client
async function initializeSmitheryClient() {
  try {
    // Create a Smithery client
    const client = createClient({
      server: '@smithery-ai/github',
      config: {
        githubPersonalAccessToken: process.env.GITHUB_TOKEN
      }
    });
    
    console.log('Smithery client initialized successfully');
    return client;
  } catch (error) {
    console.error('Error initializing Smithery client:', error);
    throw error;
  }
}

// Function to search for repositories
async function searchRepositories(client, query) {
  try {
    const result = await client.call('mcp__search_repositories', { query });
    console.log('Repository search results:', result);
    return result;
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
}

// Function to get file contents
async function getFileContents(client, owner, repo, path) {
  try {
    const result = await client.call('mcp__get_file_contents', { owner, repo, path });
    console.log(`Contents of ${path}:`, result);
    return result;
  } catch (error) {
    console.error('Error getting file contents:', error);
    throw error;
  }
}

// Function to create or update a file
async function createOrUpdateFile(client, owner, repo, path, content, message, branch) {
  try {
    const result = await client.call('mcp__create_or_update_file', {
      owner,
      repo,
      path,
      content,
      message,
      branch
    });
    console.log(`File ${path} created/updated successfully`);
    return result;
  } catch (error) {
    console.error('Error creating/updating file:', error);
    throw error;
  }
}

// Function to create an issue
async function createIssue(client, owner, repo, title, body) {
  try {
    const result = await client.call('mcp__create_issue', {
      owner,
      repo,
      title,
      body
    });
    console.log('Issue created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating issue:', error);
    throw error;
  }
}

// Main function to demonstrate GitHub integration
async function main() {
  try {
    // Initialize the Smithery client
    const client = await initializeSmitheryClient();
    
    // Search for popular JavaScript repositories
    await searchRepositories(client, 'language:javascript stars:>10000');
    
    // Get contents of a file
    await getFileContents(client, 'jordicn', 'smithery-test-repo', 'README.md');
    
    // Create a new file
    await createOrUpdateFile(
      client,
      'jordicn',
      'smithery-test-repo',
      'example.txt',
      'This is an example file created using Smithery and MCP.',
      'Add example file',
      'main'
    );
    
    // Create an issue
    await createIssue(
      client,
      'jordicn',
      'smithery-test-repo',
      'Test Issue',
      'This is a test issue created using Smithery and MCP.'
    );
    
    console.log('All operations completed successfully');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the main function
if (require.main === module) {
  main();
}

// Export functions for use in other modules
module.exports = {
  initializeSmitheryClient,
  searchRepositories,
  getFileContents,
  createOrUpdateFile,
  createIssue
};