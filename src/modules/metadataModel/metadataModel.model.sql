CREATE TABLE metadatamodel (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  context_length INT,
  tokenizer VARCHAR(255),
  modality VARCHAR(255)
);
