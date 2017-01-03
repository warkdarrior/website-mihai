var papers = new Array();
var presentations = new Array();
var buttonids = new Array( "paperbutton", "presentationbutton", "allbutton" );
var abstracts = new Array();

function getElements()
{
  var list = document.getElementsByTagName( "DIV" );
  for( var i = 0; i < list.length; i++ )
    {
      if( list[ i ].className == "Paper" )
        {
          papers[ papers.length ] = list[ i ];
        }
      else if( list[ i ].className == "Presentation" )
        {
          presentations[ presentations.length ] = list[ i ];
        }
      else if( list[ i ].className == "Abstract" )
        {
          abstracts[ abstracts.length ] = list[ i ];
        }
    }
}

function resetButtons()
{
  for( var i = 0; i < buttonids.length; i++ )
    {
      var e = document.getElementById( buttonids[ i ] );
      e.style.backgroundColor = "";
      e.style.color = "#aa1111";
    }
}

function setPapersTo( v )
{
  for( var i = 0; i < papers.length; i++ )
    {
      var e = papers[ i ];
      if( e.style != null )
	e.style.display = v;
    }
}

function setPresentationsTo( v )
{
  for( var i = 0; i < presentations.length; i++ )
    {
      var e = presentations[ i ];
      if( e.style != null )
	e.style.display = v;
    }
}

function showPapers()
{
  setPapersTo( "" );
  setPresentationsTo( "none" );
  resetButtons();
  document.getElementById( "paperbutton" ).style.backgroundColor = "#aa1111";
  document.getElementById( "paperbutton" ).style.color = "white";
}

function showPresentations()
{
  setPapersTo( "none" );
  setPresentationsTo( "" );
  resetButtons();
  document.getElementById( "presentationbutton" ).style.backgroundColor = "#aa1111";
  document.getElementById( "presentationbutton" ).style.color = "white";
}

function showAll()
{
  setPapersTo( "" );
  setPresentationsTo( "" );
  resetButtons();
  document.getElementById( "allbutton" ).style.backgroundColor = "#aa1111";
  document.getElementById( "allbutton" ).style.color = "white";
}

function showAbstract( n )
{
  var e = document.getElementById( "Abstract" + n );
  if( e != null && e.style != null )
    {
      e.style.display = "";
    }

  e = document.getElementById( "ShowAbstract" + n );
  if( e != null && e.style != null )
    {
      e.style.display = "none";
    }

  e = document.getElementById( "HideAbstract" + n );
  if( e != null && e.style != null )
    {
      e.style.display = "";
    }
}

function hideAbstract( n )
{
  var e = document.getElementById( "Abstract" + n );
  if( e != null && e.style != null )
    {
      e.style.display = "none";
    }

  e = document.getElementById( "ShowAbstract" + n );
  if( e != null && e.style != null )
    {
      e.style.display = "";
    }

  e = document.getElementById( "HideAbstract" + n );
  if( e != null && e.style != null )
    {
      e.style.display = "none";
    }
}

function showAllAbstracts()
{
  for( var i = 0; i < papers.length + presentations.length; i++ )
    {
      showAbstract( i );
    }
  document.getElementById( "allAbstractsButton" ).style.backgroundColor = "#aa1111";
  document.getElementById( "allAbstractsButton" ).style.color = "white";
  document.getElementById( "noAbstractsButton" ).style.backgroundColor = "white";
  document.getElementById( "noAbstractsButton" ).style.color = "#aa1111";
}
function hideAllAbstracts()
{
  for( var i = 0; i < papers.length + presentations.length; i++ )
    {
      hideAbstract( i );
    }
  document.getElementById( "noAbstractsButton" ).style.backgroundColor = "#aa1111";
  document.getElementById( "noAbstractsButton" ).style.color = "white";
  document.getElementById( "allAbstractsButton" ).style.backgroundColor = "white";
  document.getElementById( "allAbstractsButton" ).style.color = "#aa1111";
}
