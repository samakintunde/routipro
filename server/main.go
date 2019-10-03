package main

import (
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"github.com/gin-contrib/cors"
	"net/http"
	"strings"
)

func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/*url", func(c *gin.Context) {
		path := c.Request.URL.Path
		path = strings.Replace(path, "/", "", 1)
		resp, err := http.Get(path)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"error": err,
			})
			return
		}

		switch resp.Header.Get("Content-Type") {
			case "application/json":
				c.JSON(resp.StatusCode, resp.Body)
		default:
			bodyContent, _ := ioutil.ReadAll(resp.Body)
			c.String(resp.StatusCode, string(bodyContent))
		}
	})

	r.Run("127.0.0.1:3020")
}