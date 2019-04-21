//константы СДНФ не считаются
var REGEX = /^\(\(!?[A-Z]{1}(&!?[A-Z]){0,}\)(\|\(!?[A-Z]{1}(&!?[A-Z]){0,}\)){0,}\)$/;
var SYMBOL_REGEX = /^!?[A-Z]|/;
var CONJUNCTION_REGEX = /^\(([A-Z]|\(![A-Z]\))(&([A-Z]|\(![A-Z]\))){1,}\)$/;
var DISJUNCTION_REGEX = /^$/;
var DISJUNCTION = "\|";
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
      for(var i=0; i<formulaSplited.length; i++)
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
  var result="";
  cnf=cnf.substring(1, cnf.length-1);
  var variables=splitFormula(cnf, CONJUNCTION);
  variables=deleteNegation(variables);
  if(!findSameElements(variables))
  {
    //result="^\(";
    for(var i=0; i<variables.length; i++)
    {
      result+="!?";
      result+=variables[i];
      if(i!=variables.length-1)
      {
        result+=CONJUNCTION;
      }
    }
    //result+="\)$";
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
