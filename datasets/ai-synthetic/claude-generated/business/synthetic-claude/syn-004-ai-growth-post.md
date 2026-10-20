<!-- synthetic; model=claude; format=how we 10x'd X growth post; industry=AI -->

# How We 10x'd Our Model Inference Speed in 90 Days

Ninety days ago our inference stack was a bottleneck. Today it is a competitive moat. Here is exactly how we got there.

When we launched our AI assistant product in Q1, we were naive about latency. We assumed users would tolerate a 4-second response time because the outputs were good enough. We were wrong. Notably, every 100ms of additional latency translated to a measurable drop in session depth. The data was unambiguous and it was a wake-up call that fundamentally changed how we think about the product.

We did three things that compounded into a 10x improvement.

First, we moved from a monolithic inference service to a disaggregated architecture that separates prefill from decode. Importantly, this alone cut our time-to-first-token by 60%. That single change empowered our engineering team to stop firefighting and start actually improving the model experience.

Second, we built a speculative decoding layer using a smaller draft model that runs in parallel. It is worth noting that speculative decoding is not magic - it is an engineering tradeoff that rewards careful tuning. Our secret sauce was training the draft model specifically on our user query distribution rather than using an off-the-shelf small model, which boosted our acceptance rate to 73%.

Third, we stopped treating hardware as a commodity. We profiled, we measured, and we invested in the specific GPU memory configurations that our workload demanded.

The result: median response latency went from 4.1 seconds to under 400ms. Throughput per GPU tripled. And crucially, our customer satisfaction scores followed. This paves the way for a whole new category of real-time AI experiences that we can now build on top of a genuinely fast foundation.

The lesson? Latency is not an ops problem. It is a product problem.
