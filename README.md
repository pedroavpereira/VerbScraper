# VerbScraper
Chrome extension designed automatically scrape and turn all the verb conjugations into a JSON string using a list of user inputed verbs, this chrome extenison uses the website https://leconjugueur.lefigaro.fr/ to collect its data by traversing its DOM and collecting the relevant information.
## Goal
This extension was created to facilitate data collection of these verbs for a future language memorization application's database (Duolingo style), and as a learning developer, learning the basics of chrome extensions seemed like an exciting learning exercise. Maybe it's true what they say, programmers will spend hours coding automating a task! 

## Usage
After clicking on the extension icon use the popup to input every verb intended to be scrapped.

![Captura de ecrã 2023-10-11 204933](https://github.com/pedroavpereira/VerbScraper/assets/118773311/1058dffa-bba3-492b-8136-ac4ea9e803d1)
#### Accepted entries
- Individual verbs
- Multiple verbs separated by a comma

The multiple verbs entry is extremely helpfull with automatization, enabling the use of an AI tool like chatGPT to give you a list of the most common french verbs separated by a comma and then it becomes a simple copy and paste task

## Functionality
The application works in 5 step:
1 All the verbs are inputed by the user and the "Get verbs" button is pressed
2 The extension service worker will receive a query Array with the verbs
3 The service worker opens a new tab with the first verb of the query and injects a script designed to scrape the necessary data, closing the tab afterwards
4 Step 3 is repeated until all the verbs in the query string have been scrapped
5 When completed a results page is opened with the scrapped data as well as any possible verbs that were not scrapped by any reason.

#### Results page look 

![Captura de ecrã 2023-10-11 210426](https://github.com/pedroavpereira/VerbScraper/assets/118773311/a6f6adb3-8265-460a-90fd-546293e969cf)


## Scraped Data Structure

The data scrapped is an array of objects where every verb is put into its object of nested objects with the mode of the verb followed by its tense: eg. `object.indicative.present`

#### Example of data scrapped for verb "Être" (to be)
```
[{"name":"etre",
"indicative":
{"present":{"1":"suis","2":"es","3":"est","4":"sommes","5":"êtes","6":"sont"},
"present perfect":{"1":"'ai été","2":"as été","3":"a été","4":"avons été","5":"avez été","6":"ont été"},
"imperfect":{"1":"'étais","2":"étais","3":"était","4":"étions","5":"étiez","6":"étaient"},
"pluperfect":{"1":"'avais été","2":"avais été","3":"avait été","4":"avions été","5":"aviez été","6":"avaient été"},
"simple past":{"1":"fus","2":"fus","3":"fut","4":"fûmes","5":"fûtes","6":"furent"},
"past perfect":{"1":"'eus été","2":"eus été","3":"eut été","4":"eûmes été","5":"eûtes été","6":"eurent été"},
"future":{"1":"serai","2":"seras","3":"sera","4":"serons","5":"serez","6":"seront"},
"past future":{"1":"'aurai été","2":"auras été","3":"aura été","4":"aurons été","5":"aurez été","6":"auront été"}},
"subjunctive":
{"present":{"1":"je sois","2":"tu sois","3":"soit","4":"nous soyons","5":"vous soyez","6":"soient"},
"past":{"1":"j'aie été","2":"tu aies été","3":"ait été","4":"nous ayons été","5":"vous ayez été","6":"aient été"},
"imperfect":{"1":"je fusse","2":"tu fusses","3":"fût","4":"nous fussions","5":"vous fussiez","6":"fussent"},
"pluperfect":{"1":"j'eusse été","2":"tu eusses été","3":"eût été","4":"nous eussions été","5":"vous eussiez été","6":"eussent été"}},
"conditional":{
"present":{"1":"serais","2":"serais","3":"serait","4":"serions","5":"seriez","6":"seraient"},
"first past":{"1":"'aurais été","2":"aurais été","3":"aurait été","4":"aurions été","5":"auriez été","6":"auraient été"},
"second past":{"1":"'eusse été","2":"eusses été","3":"eût été","4":"eussions été","5":"eussiez été","6":"eussent été"}},
"imperative":{
"present":["sois","soyons","soyez"],
"past":["aie été","ayons été","ayez été"]},
"participle":{"present":["étant"],
"past":["été","été","été","été","ayant été"]},
"infinitive":{
"present":["être"],"past":["avoir été"]},
"gerund":{"present":["en étant"],"past":["en ayant été"]},
"shape of sentence":{
"near future":{"1":"vais être","2":"vas être","3":"va être","4":"allons être","5":"allez être","6":"vont être"},
"near past":{"1":"viens d'être","2":"viens d'être","3":"vient d'être","4":"venons d'être","5":"venez d'être","6":"viennent d'être"}
}
},.....]
```

## Possible improvements
- [ ] Improve CSS on popup (primarely deleting entries style)
- [ ] Possibly change data structure if necessary in the future
- [ ] Enable scraping other aspects of the language 
- [ ] Enable scrapping from other french conjugation websites

Although some improvements can be made, this project will be left archived for the foreseable future, since it was designed to be exclusively a tool or a stepping stone into the french learning project mentioned above.
