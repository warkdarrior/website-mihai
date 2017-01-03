<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01//EN"
                            doctype-system="http://www.w3.org/TR/html4/strict.dtd" />

  <xsl:variable name="PathToRoot">
    <xsl:value-of select="/recipe-page/doc-depth/root-path" />
  </xsl:variable>

  <xsl:variable name="DocDepth"><xsl:value-of select="number( /recipe-page/doc-depth/@value )" /></xsl:variable>

  <xsl:include href="../../../../templates/_core.xsl" />

  <xsl:template match="recipe-page">
<html>

  <head>
    <title>Mihai Christodorescu: re&#355;et&#259; de Didi Balmez: <xsl:value-of select="recipe/title" /></title>

    <link type="text/css" rel="stylesheet" href="../stil_cdb.css" />

    <script type="text/javascript">
      menuName = new Array( <xsl:for-each select="menu/menu-entry"> "<xsl:value-of select="@image-prefix" />" <xsl:if test="position() != last()">, </xsl:if> </xsl:for-each> );
      depth = <xsl:value-of select="$DocDepth" />;
    </script>
    <script type="text/javascript">
      <xsl:attribute name="src"><xsl:value-of select="$PathToRoot" />/browser_script.js</xsl:attribute>
    </script>
    <style>
      TD.RecipeItemHeaderPad
      { 
        display: visible;
        border-top: hidden;
        border-right: hidden;
        border-left: 1px solid green;
        border-bottom: 1px solid green;
        width: 100%;
      }
    </style>
  </head>

  <xsl:comment>PathToRoot="<xsl:value-of select="$PathToRoot" />"</xsl:comment>
  <xsl:comment>DocDepth=<xsl:value-of select="$DocDepth" /></xsl:comment>

  <body TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0">

    <xsl:apply-templates select="location" />

    <br />

      <table align="center" width="75%" border="0" cellpadding="10" cellspacing="0">

        <tr>
          <td align="center">
            <h1 align="center">
              Re&#355;et&#259; de Didi Balmez:<br />
              <xsl:value-of select="recipe/title" /><br />
              <img height="1" width="300" border="0">
                <xsl:attribute name="src"><xsl:value-of select="$PathToRoot" />/images/black_dot.png</xsl:attribute>
              </img>
            </h1>
          </td>
        </tr>

	<tr>
	  <td align="center">

	    <table width="75%" cellpadding="10" cellspacing="0" border="0" style="border-collapse: collapse; font-family: sans-serif;">
	      <tr>
		<td style="background-color: #aaeeaa; vertical-align: middle; border: 1px solid green;">
                  <nobr><b>&#160;&#160;<xsl:value-of select="recipe/title" />&#160;&#160;</b></nobr>
		</td>
                <td class="RecipeItemHeaderPad"> <!-- width="100%" bgcolor="white" align="right"> -->
		</td>
	      </tr>
              <xsl:if test="count( recipe/ingredients//item ) &gt; 0">
                <tr>
                  <td colspan="2" style="text-align: left; border: 1px solid green;">
                    <ul>
                      <xsl:apply-templates select="recipe/ingredients/item|recipe/ingredients/ingredient-group" />
                    </ul>
                  </td>
                </tr>
              </xsl:if>
	      <tr>
		<td colspan="2" style="border: 1px solid green;">
		  <p style="text-align: justify;">
                    <xsl:apply-templates select="recipe/preparation" />
		  </p>
		  <p align="center">Poft&#x103; bun&#x103;!</p>
		</td>
	      </tr>
	    </table>

	  </td>
	</tr>

      </table>

    <br />

    <xsl:call-template name="colophon">
      <xsl:with-param name="CopyrightStartYear">1998</xsl:with-param>
      <xsl:with-param name="CreationTime">Mon Dec 21 21:12:13 PST 1998</xsl:with-param>
      <xsl:with-param name="ModificationTime"><xsl:value-of select="current-date" /></xsl:with-param>
    </xsl:call-template>
  </body>

</html>

  </xsl:template>

  <xsl:template match="preparation//node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="preparation//@*">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>


  <xsl:template match="ingredients/item|ingredient-group/item">
    <li><xsl:value-of select="." /></li>
  </xsl:template>


  <xsl:template match="ingredients//ingredient-group">
    <li>
      <xsl:value-of select="title" />
      <ul>
        <xsl:apply-templates select="item|ingredient-group" />
      </ul>
    </li>
  </xsl:template>


</xsl:stylesheet>
