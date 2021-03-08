package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/contact")
public class ContactServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the values entered in the form.
    String fullNameValue = request.getParameter("fullname");
    String emailValue = request.getParameter("email");
    String subjectValue = request.getParameter("subject");
    String messageValue = request.getParameter("message");

    // Print the value so you can see it in the server logs.
    System.out.println("You submitted: " + fullNameValue);
    System.out.println("You submitted: " + emailValue);
    System.out.println("You submitted: " + subjectValue);
    System.out.println("You submitted: " + messageValue);

    // Write the value to the response so the user can see it.
    response.getWriter().println("You submitted: " + fullNameValue);
    response.getWriter().println("You submitted: " + emailValue);
    response.getWriter().println("You submitted: " + subjectValue);
    response.getWriter().println("You submitted: " + messageValue);
  }
}