//константы СДНФ не считаются
var REGEX = /^\(\(!?[A-Z]{1}(&!?[A-Z]){0,}\)(\|\(!?[A-Z]{1}(&!?[A-Z]){0,}\)){0,}\)$/;
var SYMBOL_REGEX = /^[A-Z]|\(![A-Z]\)$/;
var CONJUNCTION_REGEX = /^\(([A-Z]|\(![A-Z]\))(&([A-Z]|\(![A-Z]\))){1,}\)$/;
var DISJUNCTION_REGEX = /^\((([A-Z]|\(![A-Z]\))|(\(([A-Z]|\(![A-Z]\))(&([A-Z]|\(![A-Z]\))){1,}\)))(\|(([A-Z]|\(![A-Z]\))|(\(([A-Z]|\(![A-Z]\))(&([A-Z]|\(![A-Z]\))){1,}\)))){1,}\)$/;
var SUBFORMULA_REGEX = /\(?(([A-Z]|\(!?[A-Z]\))&?){1,}\)?/;
var DISJUNCTION = "|";
var NEGATION = "!";
var CONJUNCTION = "&";
var ANSWER_POS="Формула является СДНФ";
var ANSWER_NEG="Формула не является СДНФ";
var formulaMain="";

//author=Korshunov
function readInput()
{
  formulaMain=document.getElementById('FirstLine').value;
  if(formulaMain.match(DISJUNCTION_REGEX)!=null)
  {
    checkFormula();
  }
  else
  {
    if(formulaMain.match(CONJUNCTION_REGEX)!=null)
    {
      checkFormula();
    }
    else
    {
      if(formulaMain.match(SYMBOL_REGEX)!=null)
      {
        checkFormula();
      }
      else
      {
        showResult(ANSWER_NEG);
      }
    }
  }
}

function checkFormula()
{
  formulaMain=formulaMain.substring(1, formulaMain.length-1);
  var formulaSplited=splitFormula(formulaMain, DISJUNCTION);
  if(!findSameElements(formulaSplited))
  {
    var regexCNF=new RegExp(createRegexCNF(formulaSplited[0]));
    if(regexCNF!="")
    {
      var result=true;
      for(var i=1; i<formulaSplited.length; i++)
      {
        if(formulaSplited[i].search(regexCNF)==-1)
        {
          result=false;
          break;
        }
      }
      if(result)
      {
        showResult(ANSWER_POS);
      }
      else
      {
        showResult(ANSWER_NEG);
      }
    }
    else
    {
      showResult(ANSWER_NEG);
    }
  }
  else
  {
    showResult(ANSWER_NEG);
  }
}

//author=Korshunov
function createRegexCNF(cnf)
{
  var REGEX=/[A-Z]/;
  var elements=cnf.match(/[A-Z]/g);
  var result="";
  if(elements.length>1)
  {
    result+="(\\(";
  }
  for(var i=0; i<elements.length; i++)
  {
    result+="("+elements[i]+"|\\(!"+elements[i]+"\\))";
    if(i!=elements.length-1)
    {
      result+="&";
    }
  }
  if(elements.length>1)
  {
    result+="\\))";
  }
  return result;
}

//author=Korshunov
function findSameElements(array)
{
  var answer=false;
  for(var i=0; i<array.length; i++)
  {
    for(var j=0; j<array.length; j++)
    {
      if(array[i]==array[j] && i!=j)
      {
        answer=true;
        break;
      }
    }
    if(answer)
    {
      break;
    }
  }
  return answer;
}

//author=Korshunov
function splitFormula(formula, reg)
{
  var result=formula.split(reg);
  return result;
}

//author=Korshunov
function deleteNegation(array)
{
  for(var i=0; i<array.length; i++)
  {
    var index=array[i].indexOf(NEGATION, 0);
    if(index!=-1)
    {
      array[i]=array[i].substring(1);
    }
  }
  return array;
}

//author=Korshunov
function showResult(message)
{
  var inf=document.getElementById('Inf');
  inf.innerHTML=message;
}
