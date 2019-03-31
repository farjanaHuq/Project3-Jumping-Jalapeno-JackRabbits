const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
   process.env.MONGODB_URI ||
   "mongodb://localhost/googlebooks"
);

const bookSeed = [
   {
      title: "The Origin of Species",
      authors: "Charles Darwin",
      description: "First published in 1859, this landmark book on evolutionary biology was not the first to deal with the subject, but it went on to become a sensation—and a controversial one for many religious people who could not reconcile Darwin’s science with their faith. Darwin worked on the book for over 20 years before its publication. The radical crux of his scientific theory was the idea of natural selection, which meant that chance, not a divine Creator, played a great role in humanity's advancement and that individuals who weren't physically able to adapt with the greater populace died off.",
      image: "https://books.google.com/books/content?id=YY4EAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70TeeyUkT4L_6PI_iEMJsGnskzafbX46KoM3Q130Aiw_ofOpKo3hXqIMBWpoo0rtXmzk2COAsASBYWdqW4_25YWHrfgncWAKfxgJkVWh7cGjqOxcodaiuP7IGxdivRxLrss3BU1",
      link: "https://books.google.com/books?id=YY4EAAAAYAAJ&dq=on+the+origin+of+species&source=gbs_navlinks_s"
   },
   {
      title: "The Dead Zone",
      authors: "Stephen King",
      description:
         "A number-one national best seller about a man who wakes up from a five-year coma able to see people's futures and the terrible fate awaiting mankind in The Dead Zone - a \"compulsive page-turner\" (The Atlanta Journal-Constitution). Johnny Smith awakens from a five-year coma after his car accident and discovers that he can see people's futures and pasts when he touches them. Many consider his talent a gift; Johnny feels cursed. His fiancée married another man during his coma, and people clamor for him to solve their problems. When Johnny has a disturbing vision after he shakes the hand of an ambitious and amoral politician, he must decide if he should take drastic action to change the future. The Dead Zone is a \"faultlessly paced...continuously engrossing\" (Los Angeles Times) novel of second sight.",
      image: "https://books.google.com/books/content?id=O53jCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72dY7UFkVoVlYDkNv60Go2jvugcibfmcNcqC8IAExr3iMO9d-bgxp3QQzFQLidBBDCxXSF0mR-GQkmZt2kY5lWu0R4jGitAez6gQ6oRZjwUEXULuFl_ZIooZ5C3EpQ7rftfr4ad",
      link: "https://books.google.com/books?id=O53jCwAAQBAJ&dq=The+Dead+Zone&source=gbs_navlinks_s"
   },
   {
      title: "Lord of the Flies",
      authors: "William Golding",
      description:
         "The tale of a party of shipwrecked schoolboys, marooned on a coral island, who at first enjoy the freedom of the situation but soon divide into fearsome gangs which turn the paradise island into a nightmare of panic and death.",
      image: "https://books.google.com/books/content?id=iyfgqV5dxXQC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72ydSh3wMvZW3nzGQ-XbTEMBCMlJlJVbD2cdmfyd0G49fwO2RHMX-DvAd8nGbSoRT-ExQRB0y541piblw2eDGLx31dJWeTEJy1hCDfIKFYjFmo1307_DcHCaf99bMVhVfYkjTyQ",
      link: "https://books.google.com/books?id=iyfgqV5dxXQC&dq=Lord+of+the+Flies&source=gbs_navlinks_s"
   },
   {
      title: "The Catcher in the Rye",
      authors: "J.D. Salinger",
      description:
         "The Catcher in the Rye is a 1951 novel by J. D. Salinger. A controversial novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation. It has been translated into almost all of the world's major languages. Around 1 million copies are sold each year with total sales of more than 65 million books. The novel's protagonist Holden Caulfield has become an icon for teenage rebellion. The novel also deals with complex issues of innocence, identity, belonging, loss, and connection.",
      image: "https://books.google.com/books/content?id=VPpQjwEACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73uXBaBIJghuCIhu-dS2SWjO9pbMlEO-0qKnkAomKXE0bIihzCbn3zU9IP1kYiHDxOBGJaz2fvCFOSDC5L_6m_X_YZGN3HEgiBOJj3DiMBdMc-tyXM_E5Q-dJScSeeVtDurXJpd",
      link: "https://books.google.com/books?id=VPpQjwEACAAJ&dq=The+Catcher+in+the+Rye&hl=en&sa=X&ved=0ahUKEwiYpPrCwKXhAhUzFjQIHSNmD9oQ6AEIKjAA"
   },
   {
      title: "The Punch Escrow",
      authors: "Tal M. Klein",
      description:
         "It's the year 2147. Advancements in nanotechnology have enabled us to control aging. We’ve genetically engineered mosquitoes to feast on carbon fumes instead of blood, ending air pollution. And teleportation has become the ideal mode of transportation, offered exclusively by International Transport―the world’s most powerful corporation, in a world controlled by corporations. Joel Byram spends his days training artificial-intelligence engines to act more human and trying to salvage his deteriorating marriage. He’s pretty much an everyday twenty-second century guy with everyday problems―until he’s accidentally duplicated while teleporting. Now Joel must outsmart the shadowy organization that controls teleportation, outrun the religious sect out to destroy it, and find a way to get back to the woman he loves in a world that now has two of him.",
      image: "https://books.google.com/books/content?id=wns3DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72Ccbw6QIsgUjIIqGWXjyZWVk986Z4Ve5Q3cnpPtxs2a91sayO9WwE2IXx3M9An5CDBd-2W_gRaEqf-OZ3M5F48x_C8eMWkpPckCISZ_FxmIv5aX-6azb6nGQq1nV7TFh4WHC2J",
      link: "https://books.google.com/books?id=wns3DwAAQBAJ&dq=The+Punch+Escrow&source=gbs_navlinks_s"
   },
   {
      title: "Coraline",
      authors: "Neil Gaiman",
      description:
         "When Coraline steps through a door to find another house strangely similar to her own (only better), things seem marvelous. But there's another mother there, and another father, and they want her to stay and be their little girl. They want to change her and never let her go. Coraline will have to fight with all her wit and courage if she is to save herself and return to her ordinary life.",
      image: "https://books.google.com/books/content?id=C8NVhWNU_uIC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE720qctYyvIRFNuSkQX48bIlY1fBvJh77DS3UOLL9W34qvSM8eAsVq-D_OrO1kykInAW1MhNpmt1iygO9s8tC9u60RNP5xOcFadnH0nQJJRnoFVkzX0E3I3jhno0xapa6Tl721AW",
      link: "https://books.google.com/books?id=C8NVhWNU_uIC&dq=Coraline&source=gbs_navlinks_s"
   },
   {
      title: "Code: The Hidden Language of Computer Hardware and Software",
      authors: "Charles Petzold",
      description:
         "What do flashlights, the British invasion, black cats, and seesaws have to do with computers? In CODE, they show us the ingenious ways we manipulate language and invent new means of communicating with each other. And through CODE, we see how this ingenuity and our very human compulsion to communicate have driven the technological innovations of the past two centuries. Using everyday objects and familiar language systems such as Braille and Morse code, author Charles Petzold weaves an illuminating narrative for anyone who’s ever wondered about the secret inner life of computers and other smart machines. It’s a cleverly illustrated and eminently comprehensible story—and along the way, you’ll discover you’ve gained a real context for understanding today’s world of PCs, digital media, and the Internet. No matter what your level of technical savvy, CODE will charm you—and perhaps even awaken the technophile within.",
      image: "https://books.google.com/books/content?id=iptCAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72UL9U7fw7esBdwOnnW4EsD4iIeL-kAnH50edULXUqfdZHHZZewelV1eJ-mVCYUxRUdRjVtEWNrZoMXfOKDJjZyOPrz-qk38rAwxOJKrlXUH0IbuUOyjAaCllpVoyt3mIDnHslC",
      link: "https://books.google.com/books?id=iptCAwAAQBAJ&dq=Code:+The+Hidden+Language+of+Computer+Hardware+and+Software&source=gbs_navlinks_s"
   },
   {
      title: "Total Recall: My Unbelievably True Life Story",
      authors: "Arnold Schwarzenegger",
      description:
         "In his signature larger-than-life style, Arnold Schwarzenegger’s Total Recall is a revealing self-portrait of his illustrious, controversial, and truly unique life. The greatest immigrant success story of our time. His story is unique, and uniquely entertaining, and he tells it brilliantly in these pages. He was born in a year of famine, in a small Austrian town, the son of an austere police chief. He dreamed of moving to America to become a bodybuilding champion and a movie star. By the age of twenty-one, he was living in Los Angeles and had been crowned Mr. Universe. Within five years, he had learned English and become the greatest bodybuilder in the world. Within ten years, he had earned his college degree and was a millionaire from his business enterprises in real estate, landscaping, and bodybuilding. He was also the winner of a Golden Globe Award for his debut as a dramatic actor in Stay Hungry. Within twenty years, he was the world’s biggest movie star, the husband of Maria Shriver, and an emerging Republican leader who was part of the Kennedy family. Thirty-six years after coming to America, the man once known by fellow body­builders as the Austrian Oak was elected governor of California, the seventh largest economy in the world. He led the state through a budget crisis, natural disasters, and political turmoil, working across party lines for a better environment, election reforms, and bipartisan solutions. With Maria Shriver, he raised four fantastic children. In the wake of a scandal he brought upon himself, he tried to keep his family together. Until now, he has never told the full story of his life, in his own voice. Here is Arnold, with total recall.",
      image: "https://books.google.com/books/content?id=ZvojgDyjYM4C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72xYgplBgVMYCWyuAvklBsIsxbPK16CMSQRR2rPQH_tIIW61ogWDGMM1FrHDdWpABlcvuO4Q05frv7iAqjc2UqRxnhvJQC7p1pestjAnaeu3QMaAvA2gbJ77HKLrpHm7hwcMJgE",
      link: "https://books.google.com/books?id=ZvojgDyjYM4C&dq=Total+Recall:+My+Unbelievably+True+Life+Story&source=gbs_navlinks_s"
   },
   {
      title: "Astrophysics for People in a Hurry",
      authors: "Neil deGrasse Tyson",
      description:
         "What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There's no better guide through these mind-expanding questions than acclaimed astrophysicist and best-selling author Neil deGrasse Tyson. But today, few of us have time to contemplate the cosmos. So Tyson brings the universe down to Earth succinctly and clearly, with sparkling wit, in digestible chapters consumable anytime and anywhere in your busy day. While waiting for your morning coffee to brew, or while waiting for the bus, the train, or the plane to arrive, Astrophysics for People in a Hurry will reveal just what you need to be fluent and ready for the next cosmic headlines: from the big bang to black holes, from quarks to quantum mechanics, and from the search for planets to the search for life in the universe.",
      image: "https://books.google.com/books/content?id=hx5DDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71bEc-KR6_QXWF0FnfnlvOd7Srt3Rcn5Y7DeGtqY-eN9RwzMLSUqdWXhD88JfjT_n47tf2vuzyMnrfG2vboXKb2D2V_aT8_NxoHteZ91eY0pDGwcaOCMYudsa-1DwnvFmR_3bUF",
      link: "https://books.google.com/books?id=hx5DDQAAQBAJ&dq=Astrophysics+for+People+in+a+Hurry&source=gbs_navlinks_s"
   },
   {
      title: "1984",
      authors: "George Orwell",
      description:
         "Winston Smith toes the Party line, rewriting history to satisfy the demands of the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake and persecutes those who dare to commit thoughtcrimes. But as he starts to think for himself, Winston can’t escape the fact that Big Brother is always watching... A startling and haunting vision of the world, 1984 is so powerful that it is completely convincing from start to finish. No one can deny the influence of this novel, its hold on the imaginations of multiple generations of readers, or the resiliency of its admonitions—a legacy that seems only to grow with the passage of time.",
      image: "https://books.google.com/books/content?id=VO8nDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72bMpf8Rbx6u9wq7xlcWeorr3uuob5tbgPPdBQuFls64ED79c95__RjQyw_iQcCKsyvfXSzHs7qJIgmI-Br_c-dapBjGIQI5nuLozqr1NG22n-QYRP6ZkyK56Z72PXLCgt6No6H",
      link: "https://books.google.com/books?id=VO8nDwAAQBAJ&dq=1984+by+george+orwell&source=gbs_navlinks_s"
   },
   {
      title: "Frankenstein",
      authors: "Mary Shelley",
      description:
         "Few creatures of horror have seized readers' imaginations and held them for so long as the anguished monster of Mary Shelley's Frankenstein. The story of Victor Frankenstein's terrible creation and the havoc it caused has enthralled generations of readers and inspired countless writers of horror and suspense. Considering the novel's enduring success, it is remarkable that it began merely as a whim of Lord Byron's. \"We will each write a story,\" Byron announced to his next-door neighbors, Mary Wollstonecraft Godwin and her lover Percy Bysshe Shelley. The friends were summering on the shores of Lake Geneva in Switzerland in 1816, Shelley still unknown as a poet and Byron writing the third canto of Childe Harold. When continued rains kept them confined indoors, all agreed to Byron's proposal. The illustrious poets failed to complete their ghost stories, but Mary Shelley rose supremely to the challenge. With Frankenstein, she succeeded admirably in the task she set for herself: to create a story that, in her own words, \"would speak to the mysterious fears of our nature and awaken thrilling horror -- one to make the reader dread to look round, to curdle the blood, and quicken the beatings of the heart.\"",
      image: "https://books.google.com/books/content?id=t9X9G6iuMaAC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70gP6QiL3g6H_iK0UjDyLcR6R82Uo4OlYMmzi5vqThPlhNX9u9e72kbxG3SqS-tmBYKXABa8sUykcfms3jLBeCOtYrUhGelC-4DcOLm3TqLTLCgUXJEFatkWxZNqvCFDAESPtDO",
      link: "https://books.google.com/books?id=t9X9G6iuMaAC&dq=Frankenstein&source=gbs_navlinks_s"
   },
   {
      title: "The Great Gatsby",
      authors: "F. Scott Fitzgerald",
      description:
         "The authentic edition from Fitzgerald's original publisher. This edition approved by the Holden-Crowther Literary Organisation. The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted \"gin was the national drink and sex the national obsession,\" it is an exquisitely crafted tale of America in the 1920s. The Great Gatsby is one of the great classics of twentieth-century literature.",
      image: "https://books.google.com/books/content?id=c4LZnQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72xPhXAKuxfYrAP9NEdgovpU0zyGdyG78z0HvyAb7IKvxkmxWg-3ECEJQ5kqmeLYugOQhN2QYRLUBGUtIh0CVqkvUFruAbProD2lAuodEyDyPlsaeN5FC16pi4n4NKanEnMSDL8",
      link: "https://books.google.com/books?id=c4LZnQAACAAJ&dq=The+Great+Gatsby&hl=en&sa=X&ved=0ahUKEwipi-_3z6XhAhVXsp4KHdWaD4AQ6AEINTAC"
   }
];

db.Book
   .remove({})
   .then(() => db.Book.collection.insertMany(bookSeed))
   .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
   })
   .catch(err => {
      console.error(err);
      process.exit(1);
   });
;
