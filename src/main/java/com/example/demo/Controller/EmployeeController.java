package com.example.demo.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class EmployeeController {

	
	@RequestMapping("/")
	public String getEmployee() {
		return "empolyee";
	}
	
}
