var regex=/^(\((!?[A-Z]{1}&)+!?[A-Z]{1}\)\|)+\((!?[A-Z]{1}&)+!?[A-Z]{1}\)$/;
var formulaMain="";

function readInput()
{
  formulaMain=document.getElementById('FirstLine').value;
  if(formulaMain.search(regex)!=-1)
  {
    var formulaSplited=splitFormula(formulaMain, '|');
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
          showResult("Формула является СДНФ");
        }
        else
        {
          showResult("Формула не является СДНФ");
        }
      }
      else
      {
        showResult("Формула не является СДНФ");
      }
    }
    else
    {
      showResult("Формула не является СДНФ,\nт.к. содержит одинаковые конъюнкции");
    }
  }
  else
  {
    showResult("Формула введена некорректно");
  }
}

function createRegexCNF(cnf)
{
  var result="";
  cnf=cnf.substring(1, cnf.length-1);
  var variables=splitFormula(cnf, '&');
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
        result+="&";
      }
    }
    //result+="\)$";
  }
  return result;
}

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

function splitFormula(formula, reg)
{
  var result=formula.split(reg);
  return result;
}

function deleteNegation(array)
{
  for(var i=0; i<array.length; i++)
  {
    var index=array[i].indexOf("!", 0);
    if(index!=-1)
    {
      array[i]=array[i].substring(1);
    }
  }
  return array;
}

function showResult(message)
{
  var inf=document.getElementById('Inf');
  inf.innerHTML=message;
}
