package com.majorproject.gradeusbackend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.majorproject.gradeusbackend.repository.UserRepository;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService
{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        log.info("Loading user by username: {}", username);
        return userRepository.findByUsername(username)
                .orElseThrow(
                        () ->
                        {
                            return new UsernameNotFoundException("User not found");
                        }
                );
    }

}
