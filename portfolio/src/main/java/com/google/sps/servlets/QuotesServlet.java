package com.google.sps.servlets;

import java.util.ArrayList;
import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Handles requests sent to the /hello URL. Try running a server and navigating to /hello! */
@WebServlet("/quotes")
public class QuotesServlet extends HttpServlet {
  ArrayList<String> quotesList = new ArrayList<String>();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    quotesList.add("\"Good and evil are a question of perspective.\"");
    quotesList.add("\"I don’t have time to worry if it’s right or wrong, you can’t hope for a horror story with a happy ending.\"");
    quotesList.add("\"True happiness can only be achieved through sacrifice, like the sacrifices our parents have made for us to be here today.\"");

    String json = convertToJsonUsingGson(quotesList);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }

  private String convertToJsonUsingGson(ArrayList<String> quotes) {
    Gson gson = new Gson();
    String json = gson.toJson(quotes);
    return json;
  }
}
