package io.github.marcusadriano.todo;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
		RequestMethod.DELETE })
@Controller("/api/v1")
@RestController
public class TodoController {

	@Autowired
	private TodoRepository repo;

	@GetMapping("/")
	public ResponseEntity<Collection<TodoEntity>> findAll() {
		return ResponseEntity.ok(repo.findAll());
	}

	@PostMapping("/")
	public ResponseEntity<TodoEntity> save(@RequestBody TodoEntity entity) {
		final var result = repo.save(entity);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable("id") Integer id) {
		repo.deleteAllById(Arrays.asList(id));
	}

}
