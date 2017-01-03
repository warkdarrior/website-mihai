<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01//EN"
                            doctype-system="http://www.w3.org/TR/html4/strict.dtd" />

  <xsl:variable name="PathToRoot">
    <xsl:value-of select="/didibalmez-cdb-chapter/doc-depth/root-path" />
  </xsl:variable>

  <xsl:variable name="DocDepth"><xsl:value-of select="number( /didibalmez-cdb-chapter/doc-depth/@value )" /></xsl:variable>

  <xsl:include href="../../../../templates/_core.xsl" />

  <xsl:template match="didibalmez-cdb-chapter">
<html>

  <head>
    <title>Mihai Christodorescu: re&#355;ete de Didi Balmez: <xsl:value-of select="chapter/title" /></title>

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

    <center>
      <div class="MainContents">

        <h1 align="center">
          Re&#355;ete de Didi Balmez:<br />
          <xsl:value-of select="chapter/title" /><br />
          <img height="1" width="300" border="0">
            <xsl:attribute name="src"><xsl:value-of select="$PathToRoot" />/images/black_dot.png</xsl:attribute>
          </img>
        </h1>

        <xsl:apply-templates select="chapter" />

      </div>
    </center>

    <br />

    <xsl:call-template name="colophon">
      <xsl:with-param name="CopyrightStartYear">1998</xsl:with-param>
      <xsl:with-param name="CreationTime">Mon Dec 21 21:12:13 PST 1998</xsl:with-param>
      <xsl:with-param name="ModificationTime"><xsl:value-of select="current-date" /></xsl:with-param>
    </xsl:call-template>
  </body>

</html>

  </xsl:template>


  <!-- ====================================================================== -->


  <xsl:template match="chapter">

    <xsl:if test="count( intro ) &gt; 0" >
      <div class="Introducere">
        <xsl:copy-of select="intro" />
      </div>
    </xsl:if>

    <xsl:apply-templates select="section|recipes" />

  </xsl:template>


  <!-- ====================================================================== -->


  <xsl:template match="recipes">

    <xsl:variable name="Depth" select="count( ancestor::node() ) - 4" />

    <xsl:if test="count( id ) &gt;= 4" >
      <xsl:variable name="RecipeCount" select="count( id )" />

      <!-- select="floor( sum( recipes/id ) div $RecipeCount )" -->
      <xsl:variable name="MedianID">
        <xsl:for-each select="id">
          <xsl:sort select="." data-type="number" order="ascending" />

          <xsl:if test="position() = floor( $RecipeCount div 2 ) + ( $RecipeCount mod 2 )">
            <xsl:copy-of select="." />
          </xsl:if>
        </xsl:for-each>
      </xsl:variable>

      <div class="GrupDeReteteInIndex">
        <table>
          <tbody>
            <tr valign="top">
              <td style="border-right: 1px solid green; padding-right: 10px">
                <xsl:for-each select="id[ number( . ) &lt;= $MedianID ]">
                  <xsl:sort select="." data-type="number" order="ascending" />
                  <xsl:variable name="RecipeID"><xsl:value-of select="." /></xsl:variable>
                  <xsl:call-template name="RecipeEntry">
                    <xsl:with-param name="ThisRecipeID" select="$RecipeID" />
                    <xsl:with-param name="Depth" select="$Depth + 1" />
                  </xsl:call-template>
                </xsl:for-each>
              </td>
              <td style="padding-left: 10px">
                <xsl:for-each select="id[ number( . ) &gt; $MedianID ]">
                  <xsl:sort select="." data-type="number" order="ascending" />
                  <xsl:variable name="RecipeID"><xsl:value-of select="." /></xsl:variable>
                  <xsl:call-template name="RecipeEntry">
                    <xsl:with-param name="ThisRecipeID" select="$RecipeID" />
                    <xsl:with-param name="Depth" select="$Depth + 1" />
                  </xsl:call-template>
                </xsl:for-each>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </xsl:if>

    <xsl:if test="count( id ) &gt; 0 and count( id ) &lt; 4" >
      <div class="GrupDeReteteInIndex">
        <xsl:for-each select="id">
          <xsl:sort select="." data-type="number" order="ascending" />
          <xsl:variable name="RecipeID"><xsl:value-of select="." /></xsl:variable>
          <xsl:call-template name="RecipeEntry">
            <xsl:with-param name="ThisRecipeID" select="$RecipeID" />
            <xsl:with-param name="Depth" select="$Depth + 1" />
          </xsl:call-template>
        </xsl:for-each>
      </div>
    </xsl:if>
  </xsl:template>


  <!-- ====================================================================== -->


  <xsl:template match="section">

    <xsl:variable name="Depth" select="count( ancestor::node() ) - 3" />
    <xsl:variable name="ThisSectionID" select="id" />
    <xsl:variable name="GlobalID" select="$ThisSectionID + count( //section[ id &lt; $ThisSectionID ]/recipes/id )" />

    <div>
      <xsl:attribute name="class">GrupDeRetete<xsl:value-of select="$Depth" /></xsl:attribute>

      <a>
        <xsl:attribute name="name">Section<xsl:value-of select="$ThisSectionID" /></xsl:attribute>
      </a>
      <!-- Section # <xsl:value-of select="id" />: -->
      <div>
        <xsl:attribute name="class">TitluGrup<xsl:value-of select="$Depth" /></xsl:attribute>
        <xsl:value-of select="title" />
      </div>
      <xsl:if test="count( intro ) &gt; 0" >
        <div>
          <xsl:attribute name="class">IntroducereGrup<xsl:value-of select="$Depth" /></xsl:attribute>
          <xsl:copy-of select="intro" />
        </div>
      </xsl:if>

      <xsl:apply-templates select="section|recipes" />

    </div>

  </xsl:template>


  <!-- ====================================================================== -->


  <xsl:template name="RecipeEntry">
    <xsl:param name="ThisRecipeID" select="'0'" />
    <xsl:param name="Depth" select="'0'" />

    <xsl:variable name="ThisRecipe" select="//recipe[ id = $ThisRecipeID ]" />
    <xsl:variable name="ParentID" select="//*[ recipes/id = $ThisRecipeID ]/id" />
    <xsl:variable name="GlobalID" select="$ParentID + $ThisRecipeID" />

    <div class="RetetaInIndex">
      <!-- Recipe # <xsl:value-of select="$ThisRecipeID" />: -->
      <a class="Onsite">
        <xsl:attribute name="href"><xsl:value-of select="$ThisRecipe/file" />.html</xsl:attribute>
        <xsl:value-of select="$ThisRecipe/title" />
      </a>
      <br />
    </div>
  </xsl:template>


  <!-- ====================================================================== -->


  <xsl:template name="StringMultiplier">
    <xsl:param name="Count" select="'1'" />
    <xsl:param name="String" select="'##'" />

    <xsl:if test="number( $Count ) &gt; 0">
      <xsl:value-of select="$String" />
      <xsl:call-template name="StringMultiplier">
        <xsl:with-param name="Count" select="number( $Count ) - 1" />
        <xsl:with-param name="String" select="$String" />
      </xsl:call-template>
    </xsl:if>
  </xsl:template>


  <!-- ====================================================================== -->


</xsl:stylesheet>
