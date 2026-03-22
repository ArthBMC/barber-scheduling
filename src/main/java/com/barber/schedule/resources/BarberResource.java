package com.barber.schedule.resources;

import com.barber.schedule.entities.Barber;
import com.barber.schedule.entities.BarberBlock;
import com.barber.schedule.entities.BarberSchedule;
import com.barber.schedule.entities.dtos.BarberBlockDTO;
import com.barber.schedule.entities.dtos.BarberScheduleDTO;
import com.barber.schedule.services.BarberService;
import com.barber.schedule.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping(value = "/barbers")
public class BarberResource {

    @Autowired
    private BarberService barberService;
    @Autowired
    private ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<Barber>> findAll(){
        List<Barber> Barbers = barberService.findAll();
        return ResponseEntity.ok().body(Barbers);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Barber> findById(@PathVariable Long id){
        Barber obj = barberService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Barber> update(@PathVariable Long id, @RequestBody Barber obj){
        obj = barberService.update(id, obj);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping(value = "/{id}/available-schedule")
    public ResponseEntity<List<LocalTime>> getSchedule(@PathVariable Long id, @RequestParam LocalDate date){
        return ResponseEntity.ok(scheduleService.getAvailableSchedule(id, date));
    }

    @PostMapping(value = "/{id}/blocks")
    public ResponseEntity<BarberBlock> blockSchedule(@PathVariable Long id, @RequestBody BarberBlockDTO dto){
        return ResponseEntity.ok(scheduleService.blockSchedule(id, dto));
    }

    @DeleteMapping("/{id}/blocks/{blockId}")
    public ResponseEntity<Void> unlockSchedule(@PathVariable Long id, @PathVariable Long blockId){
        scheduleService.unlockSchedule(blockId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/schedules")
    public ResponseEntity<List<BarberSchedule>> syncSchedules(@PathVariable Long id,
                                                              @RequestBody List<BarberScheduleDTO> dto){
        List<BarberSchedule> updatedSchedule = scheduleService.syncSchedule(id, dto);
        return ResponseEntity.ok(updatedSchedule);
    }

}

c