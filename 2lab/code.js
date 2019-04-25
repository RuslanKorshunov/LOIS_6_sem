var ANSWER_POS="Введенное выражение является формулой.";
var ANSWER_NEG="Введенное выражение не является формулой.";
var formulaMain="";

function readFormula()
{
  formulaMain=document.getElementById('FirstLine').value;
  if(verificationFormula(formulaMain))
  {
    showResult(ANSWER_POS);
    var elements=findElements();
    showResult(createField(elements));
  }
  else
  {
    showResult(ANSWER_NEG);
  }
}

//author=Korshunov
function findElements()
{
  var elements=formulaMain.match(/[A-Z]/g);
  for(var i=0; i<elements.length; i++)
  {
    for(var j=i+1; j<elements.length; j++)
    {
      if(elements[i]==elements[j])
      {
        elements.splice(j, 1);
        j--;
      }
    }
  }
  return elements;
}

function createField(elements)
{
  var message="</br>";
  for(var i=0; i<elements.length; i++)
  {
    message+=elements[i]+": <input type=\"text\" name=\""+elements[i]+"\"/></br>";
  }
  message+="</br><input type=\"button\" value=\"Посчитать\" onclick=\"calculate()\"/></br>";
  return message;
}

function calculate()
{

}

//author=Korshunov
function showResult(message)
{
  var inf=document.getElementById('Inf');
  inf.innerHTML=message;
}
