package com.api.fibbo.controller;

import com.api.fibbo.model.Item;
import com.api.fibbo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.findAll();
    }

    @GetMapping("/pagination")
    public Page<Item> getItemsPaginated(@RequestParam(defaultValue = "0") int page) {
        int pageSize = 6;
        return itemService.findAllPaginated(page, pageSize);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.save(item);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item) {
        return itemService.findById(id)
                .map(existingItem -> {
                    item.setId(id);
                    item.setDataCriacao(existingItem.getDataCriacao());
                    return ResponseEntity.ok(itemService.save(item));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Item> patchItem(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return itemService.findById(id)
                .map(existingItem -> {
                    updates.forEach((key, value) -> {
                        switch (key) {
                            case "nome":
                                existingItem.setNome((String) value);
                                break;
                            case "descricao":
                                existingItem.setDescricao((String) value);
                                break;
                            // Adicione outros campos conforme necessário
                        }
                    });
                    return ResponseEntity.ok(itemService.save(existingItem));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
