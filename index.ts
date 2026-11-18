import { streamText } from 'ai'

const result = streamText({
  model: 'spacexai/grok-4.7',
  prompt: 'Why is the sky blue?',
})

// streamText is lazy: nothing is printed until the stream is consumed.
for await (const textPart of result.textStream) {
  process.stdout.write(textPart)
}

process.stdout.write('\n')
console.error('\nUsage:', await result.usage)
