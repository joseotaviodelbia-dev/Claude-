import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

const apiKey = process.env.OPENROUTER_API_KEY
if (!apiKey) {
  console.error('Missing OPENROUTER_API_KEY (see .env.example).')
  process.exit(1)
}

const openrouter = createOpenRouter({ apiKey })

// OpenRouter model slug; override with OPENROUTER_MODEL if it differs.
const modelId = process.env.OPENROUTER_MODEL ?? 'x-ai/grok-4.7'

const result = streamText({
  model: openrouter(modelId),
  prompt: 'Why is the sky blue?',
})

// streamText is lazy: nothing is printed until the stream is consumed.
for await (const textPart of result.textStream) {
  process.stdout.write(textPart)
}

process.stdout.write('\n')
console.error('\nUsage:', await result.usage)
