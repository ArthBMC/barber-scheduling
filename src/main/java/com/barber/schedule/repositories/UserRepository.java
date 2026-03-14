package com.barber.schedule.repositories;

import com.barber.schedule.entities.ServiceType;
import com.barber.schedule.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
