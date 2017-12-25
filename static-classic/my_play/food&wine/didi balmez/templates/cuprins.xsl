<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="1.0">

  <xsl:output method="html" doctype-public="-//W3C//DTD HTML 4.01//EN"
                            doctype-system="http://www.w3.org/TR/html4/strict.dtd" />

  <xsl:variable name="PathToRoot">
    <xsl:value-of select="/didibalmez-cdb-cuprins/doc-depth/root-path" />
  </xsl:variable>

  <xsl:variable name="DocDepth"><xsl:value-of select="number( /didibalmez-cdb-cuprins/doc-depth/@value )" /></xsl:variable>

  <xsl:include href="../../../../templates/_core.xsl" />

  <xsl:template match="didibalmez-cdb-cuprins">
<html>

  <head>
    <title>Mihai Christodorescu: re&#355;ete de Didi Balmez></title>

    <link type="text/css" rel="stylesheet" href="./stil_cdb.css" />

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
          Re&#355;ete de Didi Balmez<br />
          <img height="1" width="300" border="0">
            <xsl:attribute name="src"><xsl:value-of select="$PathToRoot" />/images/black_dot.png</xsl:attribute>
          </img>
        </h1>

        <center>
          <img src="images/F-19-01.png" />
        </center>

        <table align="center" cellspacing="20">
          <tbody>
            <tr valign="top">
              <td>
                <div style="border-top: 1px dashed green; text-align: left;">
                  <xsl:apply-templates select="chapter[ number( id ) &lt; 10 ]" />
                </div>
              </td>
              <td>
                <div style="border-top: 1px dashed green; text-align: left;">
                  <xsl:apply-templates select="chapter[ number( id ) &gt; 9 ]" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

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

    <div class="Cuprins1">
      <a class="Onsite">
        <xsl:attribute name="href"><xsl:value-of select="file" />/index.html</xsl:attribute>
        <xsl:value-of select="title" />
      </a>
      <xsl:apply-templates select="section">
        <xsl:sort select="id" data-type="number" order="ascending" />
      </xsl:apply-templates>
    </div>

  </xsl:template>


  <!-- ====================================================================== -->


  <xsl:template match="section">

    <xsl:variable name="Depth" select="count( ancestor::node() ) - 2" />
    <xsl:variable name="ThisSectionID" select="id" />
    <xsl:variable name="GlobalID" select="$ThisSectionID + count( //section[ id &lt; $ThisSectionID ]/recipes/id )" />

    <div>
      <xsl:attribute name="class">Cuprins<xsl:value-of select="$Depth" /></xsl:attribute>

      <a class="Onsite">
        <xsl:attribute name="href"><xsl:value-of select="ancestor::chapter/file" />/index.html#Section<xsl:value-of select="$ThisSectionID" /></xsl:attribute>
        <xsl:value-of select="title" />
      </a>

      <xsl:apply-templates select="section">
        <xsl:sort select="id" data-type="number" order="ascending" />
      </xsl:apply-templates>
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
