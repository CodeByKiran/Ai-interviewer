/*package com.kiran.model;

import java.util.List;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.ai.vertexai.embedding.VertexAiEmbeddingConnectionDetails;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingModel;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingOptions;

public class VertexEmbeddingModel {

    private VertexAiEmbeddingConnectionDetails connectionDetails;
    private VertexAiTextEmbeddingOptions options;
    private VertexAiTextEmbeddingModel embeddingModel;

    public VertexEmbeddingModel() {
        // Initialize connection details
        this.connectionDetails = VertexAiEmbeddingConnectionDetails.builder()
            .withProjectId(System.getenv("VERTEX_AI_GEMINI_PROJECT_ID"))
            .withLocation(System.getenv("VERTEX_AI_GEMINI_LOCATION"))
            .build();

        // Initialize embedding options
        this.options = VertexAiTextEmbeddingOptions.builder()
            .withModel(VertexAiTextEmbeddingOptions.DEFAULT_MODEL_NAME)
            .build();

        // Initialize embedding model with connection details and options
        this.embeddingModel = new VertexAiTextEmbeddingModel(this.connectionDetails, this.options);
    }

    public List<EmbeddingResponse> getEmbeddingResponse() {
        // Create embedding response for specified text
        return (List<EmbeddingResponse>) this.embeddingModel.embedForResponse(
            List.of("Hello World", "World is big and salvation is near"));
    }
}
*/
