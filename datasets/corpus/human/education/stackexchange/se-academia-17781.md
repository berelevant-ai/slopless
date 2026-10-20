# Why do many talented scientists write horrible software?

I am a software engineer and I have been working with people with academic backgrounds for several years. Many times, I've noticed that (even otherwise brilliant scientists) produce code of extremely low quality (unless their background was precisely Computer Science).
Since those people are very good in doing their research - and eventually obtain remarkable results - it seems they are clever enough to write  decent  code. Is it just that they don't think it's worth the effort? Plain arrogance? Lack of time?
Examples
It seems to me that in academia the most popular languages are C/C++ and Python (neglecting MATLAB and other vendor-specific languages). The language where I have seen the most amazing pieces of junk is actually C++. The main points are:
Really, really naive C++ code. They claim they chose C++ over Java/Python/whatever because "it's faster", but they  everything, even an array of 3 s that is deallocated few lines later, where 3 is known at compile time.
They have learned pointers from C and they use only them.
Some of them (not most of them) have read some random blog posts about OOP and now put  virtual  everywhere, using abnormal levels of abstraction.
They are convinced of pointless optimization choices.
They lack proper memory management.
They copy/paste massive amounts of code from project to project and within the same project as well.
And in this list I am omitting the problems with the  process , rather than the product. Scientists use:
no version control,
no automated builds,
no documentation,
no software process at all (neither  agile , nor traditional  waterfall ).
The workflow is:
I devise the algorithm, I write it as a massive 10k LOC piece of C++ and I click  somewhere.
As this assessment could be probably biased by my own experience, I have inspected some open source projects run by researchers (and maybe a few software engineers) and cited in many important papers. Virtually all of them were:
crashing on corner cases,
had ugly GUIs,
and the code - in my opinion - was ready for a complete rewrite.
