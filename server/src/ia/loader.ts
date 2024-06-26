import path from 'node:path'

import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { TokenTextSplitter } from 'langchain/text_splitter'

import { OpenAIEmbeddings } from '@langchain/openai'
import { RedisVectorStore } from '@langchain/redis'

import { createClient } from 'redis'

import { clearDirectory } from '../utils/path'

const loader = new DirectoryLoader(path.resolve(__dirname, '../../tmp'), {
  '.txt': (path) => new TextLoader(path),
})

export async function convertFilesContentToDB() {
  try {
    const docs = await loader.load()

    const splitter = new TokenTextSplitter({
      encodingName: 'cl100k_base',
      chunkSize: 300,
      chunkOverlap: 0,
    })

    const splittedDocuments = await splitter.splitDocuments(docs)

    const redis = createClient({
      url: 'redis://127.0.0.1:6379',
    })

    await redis.connect()

    await RedisVectorStore.fromDocuments(
      splittedDocuments,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
      {
        indexName: 'documents-embeddings',
        redisClient: redis,
        keyPrefix: 'documents:',
      },
    )

    await redis.disconnect()

    await clearDirectory()
  } catch (error) {
    console.log('Ocorreu o seguinte erro', error)
  }
}
