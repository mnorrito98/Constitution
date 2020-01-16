"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author: Mike Norrito
   Date:   1/13/2020


   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array


*/


// Generate an outline based on h1 through h6 headings in the source document 

window.addEventListener("load", makeOutline);


function makeOutline() 
{
   // Location of the document outline 
   var outline = document.getElementById("outline");

   // Source doc for the outline 
   var source = document.getElementById("doc");

   // variables containing doc fragments 
   var mainHeading = document.createElement("h1");
   var outlineList = document.createElement("ol");
   var headingText = document.createTextNode("Outline");

   // Attach the frahments to the document node tree 

   mainHeading.appendChild(headingText);
   outline.appendChild(mainHeading);
   outline.appendChild(outlineList);

   //  clal t5he \createList() function

   createList(source, outlineList);
}

function createList(source, outlineList)
{
   //Headings for the outline 
   var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];

   // Previous Level of the headings 
   var prevLevel = 0;

   //Running total of the article headings 
   var headNum = 0;


   //loop through all the child nodes of source article until no child nodes are left 

   for (var n = source.firstChild; n !== null; n = n.nextSibling)
   {
      //Examine only article headings 
      var headLevel = headings.indexOf(n.nodeName);

      //check if "headLevel" has a valid heading value 

      if (headLevel !== -1)
      {
         //add an ID to the heading if it is missing 
         headNum++;
         if (n.hasAttribute("id") === false) {
            n.setAttribute("id", "head" + headNum);
         }

         var listElem = document.createElement("li");

         //Create the Hypertext links to the document headings 
         var linkElem = document.createElement("a");
         // changes the text of the hyoertext link to match the heading 
         linkElem.innerHTML = n.innerHTML;
         //create the href attribute needed 
         linkElem.setAttribute("href", "#" + n.id);
         //Append the hypertext link to the lsit item 
         listElem.appendChild(linkElem);
         
         //Replace this line: outlineList.appendChild(listElem);
         if(headLevel === prevLevel)
         {
            //APpend the list item to the current list 
            outlineList.appendChild(listElem);
         }
         else if(headLevel > prevLevel) 
         {
            //start a new nested lsit 
            var nestedList = document.createElement("ol")
            nestedList.appendChild(listElem);
            //append nested list to last item in the current list 
            outlineList.lastChild.appendChild(nestedList);
            //change the current list to the nested list 
            outlineList = nestedList;
         }
         else
         {
            //Append the list item to a higher list 
            //Calculate the differnce between the current and previous level
            var levelUp = prevLevel - headLevel;
            //GO up to the higher level
            for (var i = 0; i < levelUp; i++) {
               outlineList = outlineList.parentNode.parentNode;
            }
            outlineList.appendChild(listElem);
         }

         //Update the value of prevLevel
         prevLevel = headLevel;
      }
   }
}