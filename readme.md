Future gadget Laboratory

# Experiment report
## Robot Eingang prevention system (temporary name)

Our facilities have been plagued by artificial intelligence trying to gain access to our top-secret data for too long. Up to this point we (mostly our Super hax0r) have deflected their efforts by sifting the requests by hand, since every common captcha has already been defeated by the evil organization of CERN themselves. Luckily my trusted Assistant and lab member 004 Cristina has acquired this sublime piece of computer engineering masterfully crafted by a friendly agent. Thus ending our frustrating period of being helpless and overworked (again thanks, Daru!), as has been predicted by my unique sense "Lesen stoner".  
The ingenious design uses a concept familiar to us humans - Puzzles. Though no a foreign concept to machines, additional complications offer more difficulty: mismatched tabs and misaligned piece pattern. This might have annoyed beta testers, but has proved difficult for machines to predict.  
We can now yet again open our resources to the world in need of our help and guidance, with no fear of breech by the evil organization of CERN.  

Thus concluding the report: **No mismatch - Test success**

Founder of Future gadget Laboratory - Lab member 001  
Hoouin kyoma

## Actual readme
### Configuration
All relevant configuration can be done in the first few lines of file [main.js](./main.js)  
- `puzzleDimension`: width of a square puzzle in puzzle pieces.
- `budSize`: approximate size of puzzle piece tabs in pixels.
- `maxDistanceFromSolution`: after pressing submit the puzzle pieces are checked for distance from their intended positions, to pass the captcha sum of these distances shall not exceed this value.
- As I have vastly overestimated my artistic ability there is currently only one picture to choose from, adding more pictures is as trivial as adding a file to the source directory and changing config value `imageFile`.
### Context 
- This captcha is a proof of concept developed for **LaurieWired 2024 Halloween Programming Challenge.**
- I chose to write it in javascript, mostly to avoid compiling and potential other complications.



**Have fun!**