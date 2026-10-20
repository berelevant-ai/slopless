# The autocomplete that learned to think

## A word at a time, a world at a time

At its core, a large language model does one simple thing: it predicts the next word. Feed it "The cat sat on the," and it guesses "mat" over "helicopter." Do that thousands of times, and you get a paragraph. Do it billions of times across trillions of words, and something strange emerges.

That strange thing is what we now call GPT, Claude, Gemini, and their cousins.

## Training: reading the internet

Before a model can answer anything, it goes through pre-training. Engineers feed it a huge corpus -- books, websites, papers, code -- and give it one job: predict what comes next. Every wrong guess shifts its settings a tiny bit. This repeats billions of times, on hardware the size of a warehouse, over weeks or months.

By the end, the model has packed knowledge into hundreds of billions of numbers. Those numbers encode facts about history, grammar, chemistry, and how a good sentence flows.

## Attention: the secret ingredient

What sets modern language models apart is a feature called attention. Instead of reading word by word and dropping what came before, the model looks back over the whole context. It weighs which words matter most for the one it is predicting now.

In "The trophy didn't fit in the bag because it was too big," you know "it" means the trophy. Attention lets the model figure that out too. Stack many layers of this, and the model builds richer ideas: first grammar, then facts, then reasoning.

## Why it sounds confident and gets things wrong

The model has no beliefs, no memory between chats, no view of the world. It produces text that fits the patterns in its training data. When those patterns are rich -- how to write a cover letter, when the Berlin Wall fell -- the output is solid. When the data was thin or absent, the model can produce fluent, wrong text.

Researchers are fixing this with better data, tools that let models search the web live, and training methods that reward "I don't know" over a made-up answer.

## More than a parlor trick

What makes language models surprising is that predicting words well, at scale, means learning a lot about the world. The next word after "Paris is the capital of" depends on geography. The next word after "she felt a sudden" depends on human emotion.

Scale that pressure across all of human writing, and you get a system that has taken in language and the world it describes. Whether that counts as real thinking -- or just a very good copy of it -- is one of the biggest open questions in science today.
